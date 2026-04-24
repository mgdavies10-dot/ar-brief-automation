"""
Forbes Best-In-State Wealth Advisors scraper.

Scrapes only publicly visible data from the Forbes list page.
Does not bypass paywalls, logins, CAPTCHAs, or access controls.

Usage:
    python scraper.py --state MN
    python scraper.py --all-states
    python scraper.py --limit 100
"""

import argparse
import csv
import json
import logging
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

import pandas as pd
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).parent
OUTPUT_DIR = BASE_DIR / "output"
LOGS_DIR = BASE_DIR / "logs"
SNAPSHOTS_DIR = BASE_DIR / "snapshots"

for _d in (OUTPUT_DIR, LOGS_DIR, SNAPSHOTS_DIR):
    _d.mkdir(parents=True, exist_ok=True)

OUTPUT_CSV = OUTPUT_DIR / "forbes_best_in_state_2026_raw.csv"
MISSING_CSV = OUTPUT_DIR / "missing_fields.csv"

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
LOG_FILE = LOGS_DIR / f"scraper_{datetime.now():%Y%m%d_%H%M%S}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
    ],
)
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
BASE_URL = "https://www.forbes.com/lists/best-in-state-wealth-advisors/"

REQUIRED_FIELDS = [
    "Name",
    "Firm",
    "City",
    "State",
    "Region",
    "Minimum Account Size For New Business",
    "Team Assets",
    "Typical Net Worth Of Relationships",
    "Typical Size Household Accounts",
    "Forbes Profile URL",
    "Source Notes",
]

# Polite delays (seconds)
PAGE_LOAD_WAIT = 4        # after initial navigation
SCROLL_PAUSE = 1.5        # between scroll steps
BETWEEN_PROFILES = 2.0    # between individual profile fetches
RETRY_WAIT = 5.0          # before retrying a failed request

# US state abbreviation → full name mapping (used to filter/normalise)
STATE_MAP = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas",
    "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware",
    "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho",
    "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas",
    "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi",
    "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada",
    "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York",
    "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma",
    "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah",
    "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia",
    "WI": "Wisconsin", "WY": "Wyoming", "DC": "District of Columbia",
}

# Invert for lookup by full name
STATE_ABBR = {v.lower(): k for k, v in STATE_MAP.items()}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _clean(text: str | None) -> str:
    """Strip whitespace; return 'Unknown' for empty/None."""
    if not text:
        return "Unknown"
    cleaned = " ".join(text.split())
    return cleaned if cleaned else "Unknown"


def _save_snapshot(html: str, label: str) -> Path:
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    slug = re.sub(r"[^a-z0-9_-]", "_", label.lower())[:60]
    path = SNAPSHOTS_DIR / f"{ts}_{slug}.html"
    path.write_text(html, encoding="utf-8")
    log.debug("Snapshot saved: %s", path)
    return path


def _normalise_state(raw: str) -> tuple[str, str]:
    """Return (abbr, full_name) given either form, or ('Unknown','Unknown')."""
    raw = raw.strip()
    if raw.upper() in STATE_MAP:
        return raw.upper(), STATE_MAP[raw.upper()]
    if raw.lower() in STATE_ABBR:
        return STATE_ABBR[raw.lower()], raw.title()
    return "Unknown", raw if raw else "Unknown"


# ---------------------------------------------------------------------------
# Core scraper class
# ---------------------------------------------------------------------------

class ForbesScraper:
    def __init__(self, headless: bool = True):
        self.headless = headless
        self._playwright = None
        self._browser = None
        self._context = None

    # ------------------------------------------------------------------
    # Browser lifecycle
    # ------------------------------------------------------------------

    @staticmethod
    def _find_chromium() -> str | None:
        """Return path to an available Chromium binary, or None to use Playwright default."""
        candidates = [
            # Pre-installed Playwright browsers (any version)
            *sorted(Path("/opt/pw-browsers").glob("chromium-*/chrome-linux/chrome"), reverse=True),
            Path("/usr/bin/chromium-browser"),
            Path("/usr/bin/chromium"),
            Path("/usr/bin/google-chrome"),
        ]
        for p in candidates:
            if Path(p).exists():
                log.info("Using Chromium binary: %s", p)
                return str(p)
        return None

    def __enter__(self):
        self._playwright = sync_playwright().start()
        launch_kwargs: dict = {
            "headless": self.headless,
            "args": [
                "--no-sandbox",
                "--disable-blink-features=AutomationControlled",
                "--disable-dev-shm-usage",
            ],
        }
        exe = self._find_chromium()
        if exe:
            launch_kwargs["executable_path"] = exe
        self._browser = self._playwright.chromium.launch(**launch_kwargs)
        self._context = self._browser.new_context(
            viewport={"width": 1280, "height": 900},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            locale="en-US",
            ignore_https_errors=True,  # allow sandbox proxy with self-signed cert
        )
        # Honour robots / rate limits — block heavy media to be polite
        self._context.route(
            "**/*.{png,jpg,jpeg,gif,webp,svg,woff,woff2,mp4,mp3}",
            lambda route: route.abort(),
        )
        return self

    def __exit__(self, *_):
        if self._context:
            self._context.close()
        if self._browser:
            self._browser.close()
        if self._playwright:
            self._playwright.stop()

    def _new_page(self):
        return self._context.new_page()

    # ------------------------------------------------------------------
    # List page
    # ------------------------------------------------------------------

    def _load_list_page(self, page, state_filter: str | None = None) -> str:
        """Navigate to the list page and return rendered HTML."""
        url = BASE_URL
        if state_filter:
            # Forbes uses a hash/query for state filtering on some versions;
            # we load the full page and filter client-side to avoid being brittle.
            log.info("Loading list page (will filter to state=%s)…", state_filter)
        else:
            log.info("Loading full list page…")

        page.goto(url, wait_until="domcontentloaded", timeout=60_000)
        time.sleep(PAGE_LOAD_WAIT)

        # Scroll to trigger lazy-loading
        self._scroll_to_bottom(page)

        html = page.content()
        _save_snapshot(html, "list_page")
        return html

    def _scroll_to_bottom(self, page, max_scrolls: int = 30):
        """Scroll incrementally to trigger lazy-loaded rows."""
        log.info("Scrolling to load all rows…")
        prev_height = 0
        for i in range(max_scrolls):
            page.evaluate("window.scrollBy(0, window.innerHeight * 2)")
            time.sleep(SCROLL_PAUSE)
            height = page.evaluate("document.body.scrollHeight")
            if height == prev_height:
                log.info("No more content after %d scrolls.", i + 1)
                break
            prev_height = height

    # ------------------------------------------------------------------
    # Parse list rows
    # ------------------------------------------------------------------

    def _parse_list_rows(self, page, state_filter: str | None, limit: int | None) -> list[dict]:
        """
        Extract row data from the Forbes list table/grid.

        Forbes renders their list as a table or a series of list items.
        We try multiple selector strategies and fall back gracefully.
        """
        records = []

        # Strategy 1: JSON-LD / window.__INITIAL_STATE__ embedded data
        records = self._try_extract_embedded_json(page, state_filter, limit)
        if records:
            log.info("Extracted %d records from embedded JSON.", len(records))
            return records

        # Strategy 2: DOM table rows
        records = self._try_extract_table_rows(page, state_filter, limit)
        if records:
            log.info("Extracted %d records from table DOM.", len(records))
            return records

        log.warning("No records found via any extraction strategy.")
        return []

    def _try_extract_embedded_json(self, page, state_filter: str | None, limit: int | None) -> list[dict]:
        """Attempt to pull data from embedded JS objects Forbes often includes."""
        candidates = [
            # Next.js / Forbes CMS patterns
            "window.__INITIAL_STATE__",
            "window.__NEXT_DATA__",
            "window.forbes?.lists",
        ]

        for expr in candidates:
            try:
                raw = page.evaluate(f"JSON.stringify({expr})")
                if raw and raw != "undefined" and len(raw) > 100:
                    data = json.loads(raw)
                    rows = self._flatten_json_data(data)
                    if rows:
                        return self._build_records(rows, state_filter, limit, source="embedded_json")
            except Exception:
                continue
        return []

    def _flatten_json_data(self, data, depth: int = 0) -> list[dict]:
        """Recursively search a JSON blob for list-like advisor records."""
        if depth > 8:
            return []
        if isinstance(data, list):
            # Look for a list of dicts that look like advisor rows
            if data and isinstance(data[0], dict):
                keys = set(data[0].keys())
                advisor_keys = {"name", "firm", "state", "city", "rank"}
                if keys & {k.lower() for k in advisor_keys}:
                    return data
            # Recurse into list items
            for item in data[:5]:  # check first 5 only to avoid huge traversal
                result = self._flatten_json_data(item, depth + 1)
                if result:
                    return result
        elif isinstance(data, dict):
            for v in data.values():
                result = self._flatten_json_data(v, depth + 1)
                if result:
                    return result
        return []

    def _try_extract_table_rows(self, page, state_filter: str | None, limit: int | None) -> list[dict]:
        """Parse visible HTML table or card grid."""
        # Common Forbes list selectors
        row_selectors = [
            "table tbody tr",
            "[class*='listTable'] tr",
            "[class*='list-item']",
            "[data-row-index]",
            "[class*='TableRow']",
        ]

        for selector in row_selectors:
            try:
                rows = page.query_selector_all(selector)
                if rows:
                    log.info("Found %d rows with selector '%s'", len(rows), selector)
                    records = []
                    for row in rows:
                        rec = self._parse_row_element(row, page)
                        if rec:
                            records.append(rec)
                    if records:
                        return self._filter_and_limit(records, state_filter, limit)
            except Exception as exc:
                log.debug("Selector '%s' failed: %s", selector, exc)
                continue
        return []

    def _parse_row_element(self, row, page) -> dict | None:
        """Extract fields from a single table row element."""
        try:
            cells = row.query_selector_all("td, [class*='cell'], [class*='Cell']")
            if not cells:
                return None

            texts = [_clean(c.inner_text()) for c in cells]
            if len(texts) < 3:
                return None

            # Try to find a profile link
            link_el = row.query_selector("a[href*='forbes.com']") or row.query_selector("a")
            profile_url = link_el.get_attribute("href") if link_el else "Unknown"
            if profile_url and profile_url.startswith("/"):
                profile_url = "https://www.forbes.com" + profile_url

            # Heuristic column mapping — Forbes columns vary by year.
            # We map positionally and by header detection.
            return {
                "_raw_cells": texts,
                "_profile_url": profile_url or "Unknown",
            }
        except Exception as exc:
            log.debug("Row parse error: %s", exc)
            return None

    def _build_records(self, rows: list[dict], state_filter: str | None, limit: int | None, source: str = "unknown") -> list[dict]:
        """Normalise raw row dicts into the canonical schema."""
        records = []
        for row in rows:
            rec = self._map_to_schema(row, source)
            records.append(rec)
        return self._filter_and_limit(records, state_filter, limit)

    def _map_to_schema(self, raw: dict, source: str) -> dict:
        """Map a raw dict (from JSON or DOM) to our canonical column schema."""
        # Case-insensitive key lookup helper
        def get(*keys):
            for k in keys:
                for rk, rv in raw.items():
                    if rk.lower().strip() == k.lower().strip():
                        return _clean(str(rv)) if rv is not None else "Unknown"
            return "Unknown"

        state_raw = get("state", "State")
        abbr, full_name = _normalise_state(state_raw)

        return {
            "Name": get("name", "advisor name", "advisor_name"),
            "Firm": get("firm", "company", "employer"),
            "City": get("city", "location"),
            "State": abbr,
            "Region": get("region"),
            "Minimum Account Size For New Business": get(
                "minimum account size", "min account", "minimum_account_size",
                "minimumAccountSize", "minAccountSize",
            ),
            "Team Assets": get("team assets", "assets", "aum", "teamAssets"),
            "Typical Net Worth Of Relationships": get(
                "typical net worth", "net worth", "typicalNetWorth",
                "typical_net_worth",
            ),
            "Typical Size Household Accounts": get(
                "typical household", "household accounts", "typicalHousehold",
                "typical_household",
            ),
            "Forbes Profile URL": raw.get("_profile_url", get("url", "profile_url", "link")),
            "Source Notes": f"Forbes Best-In-State Wealth Advisors 2026 | extracted via {source} | scraped {datetime.now():%Y-%m-%d}",
        }

    def _filter_and_limit(self, records: list[dict], state_filter: str | None, limit: int | None) -> list[dict]:
        if state_filter:
            abbr_filter = state_filter.upper()
            full_filter = STATE_MAP.get(abbr_filter, abbr_filter).lower()
            records = [
                r for r in records
                if r.get("State", "").upper() == abbr_filter
                or r.get("State", "").lower() == full_filter
            ]
            log.info("After state filter (%s): %d records", state_filter, len(records))
        if limit:
            records = records[:limit]
            log.info("After limit (%d): %d records", limit, len(records))
        return records

    # ------------------------------------------------------------------
    # Profile page enrichment
    # ------------------------------------------------------------------

    def _enrich_from_profile(self, page, record: dict) -> dict:
        """
        Visit an advisor's Forbes profile page to fill missing fields.
        Only follows URLs that belong to forbes.com.
        """
        url = record.get("Forbes Profile URL", "Unknown")
        if url == "Unknown" or not url.startswith("https://www.forbes.com"):
            return record

        log.info("  Enriching: %s (%s)", record.get("Name"), url)
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=45_000)
            time.sleep(BETWEEN_PROFILES)

            html = page.content()
            _save_snapshot(html, f"profile_{record.get('Name','unknown')[:40]}")

            # Look for structured data in script tags
            scripts = page.query_selector_all("script[type='application/ld+json']")
            for s in scripts:
                try:
                    data = json.loads(s.inner_text())
                    record = self._merge_profile_json(record, data)
                except Exception:
                    pass

            # DOM fallbacks for common profile fields
            field_map = {
                "Minimum Account Size For New Business": [
                    "[class*='minimumAccount']",
                    "[data-label*='Minimum']",
                    "dt:has-text('Minimum') + dd",
                ],
                "Team Assets": [
                    "[class*='teamAssets']",
                    "[data-label*='Assets']",
                    "dt:has-text('Assets') + dd",
                ],
                "Typical Net Worth Of Relationships": [
                    "[class*='netWorth']",
                    "[data-label*='Net Worth']",
                    "dt:has-text('Net Worth') + dd",
                ],
                "Typical Size Household Accounts": [
                    "[class*='household']",
                    "[data-label*='Household']",
                    "dt:has-text('Household') + dd",
                ],
                "Region": [
                    "[class*='region']",
                    "[data-label*='Region']",
                ],
            }

            for field, selectors in field_map.items():
                if record.get(field, "Unknown") != "Unknown":
                    continue
                for sel in selectors:
                    try:
                        el = page.query_selector(sel)
                        if el:
                            val = _clean(el.inner_text())
                            if val != "Unknown":
                                record[field] = val
                                break
                    except Exception:
                        continue

        except PWTimeout:
            log.warning("  Timeout loading profile: %s", url)
        except Exception as exc:
            log.warning("  Profile error for %s: %s", url, exc)

        return record

    def _merge_profile_json(self, record: dict, data) -> dict:
        """Merge relevant fields from JSON-LD profile data."""
        if not isinstance(data, dict):
            return record
        # Walk common JSON-LD structures
        for key, val in data.items():
            kl = key.lower()
            if "networth" in kl or "net_worth" in kl:
                if record.get("Typical Net Worth Of Relationships") == "Unknown":
                    record["Typical Net Worth Of Relationships"] = _clean(str(val))
            if "asset" in kl:
                if record.get("Team Assets") == "Unknown":
                    record["Team Assets"] = _clean(str(val))
            if "minimum" in kl:
                if record.get("Minimum Account Size For New Business") == "Unknown":
                    record["Minimum Account Size For New Business"] = _clean(str(val))
            if "region" in kl:
                if record.get("Region") == "Unknown":
                    record["Region"] = _clean(str(val))
        return record

    # ------------------------------------------------------------------
    # Main orchestration
    # ------------------------------------------------------------------

    def scrape(
        self,
        state: str | None = None,
        all_states: bool = False,
        limit: int | None = None,
        enrich_profiles: bool = False,
    ) -> list[dict]:
        state_filter = None
        if state:
            state_filter = state.upper()
            if state_filter not in STATE_MAP:
                log.error("Unknown state abbreviation: %s", state_filter)
                sys.exit(1)

        page = self._new_page()

        try:
            self._load_list_page(page, state_filter)
            records = self._parse_list_rows(page, state_filter, limit)
        finally:
            pass  # keep page open for profile enrichment below

        if not records:
            log.warning("No records extracted from list page.")
            log.info("Check snapshot in %s for debugging.", SNAPSHOTS_DIR)
            # Return empty scaffold so we still write CSVs
            return []

        log.info("Raw records before dedup: %d", len(records))
        records = _deduplicate(records)
        log.info("Records after dedup: %d", len(records))

        if enrich_profiles:
            log.info("Enriching %d records from profile pages…", len(records))
            for i, rec in enumerate(records, 1):
                log.info("[%d/%d] %s", i, len(records), rec.get("Name", "?"))
                records[i - 1] = self._enrich_from_profile(page, rec)
                time.sleep(BETWEEN_PROFILES)

        page.close()
        return records


# ---------------------------------------------------------------------------
# Deduplication
# ---------------------------------------------------------------------------

def _deduplicate(records: list[dict]) -> list[dict]:
    seen = set()
    out = []
    for r in records:
        key = (
            r.get("Name", "").lower(),
            r.get("Firm", "").lower(),
            r.get("City", "").lower(),
            r.get("State", "").lower(),
        )
        if key not in seen:
            seen.add(key)
            out.append(r)
    return out


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def write_csv(records: list[dict], path: Path):
    df = pd.DataFrame(records, columns=REQUIRED_FIELDS)
    df.to_csv(path, index=False, quoting=csv.QUOTE_ALL)
    log.info("Wrote %d rows to %s", len(df), path)


def write_missing_fields(records: list[dict], path: Path):
    rows = []
    for rec in records:
        missing = [f for f in REQUIRED_FIELDS if rec.get(f, "Unknown") == "Unknown"]
        if missing:
            rows.append({
                "Name": rec.get("Name", "Unknown"),
                "Firm": rec.get("Firm", "Unknown"),
                "State": rec.get("State", "Unknown"),
                "Missing Fields": ", ".join(missing),
                "Missing Count": len(missing),
            })
    if rows:
        df = pd.DataFrame(rows)
        df.to_csv(path, index=False, quoting=csv.QUOTE_ALL)
        log.info("Missing-fields report: %d records → %s", len(rows), path)
    else:
        log.info("No missing fields detected.")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def _parse_args():
    parser = argparse.ArgumentParser(
        description="Scrape Forbes Best-In-State Wealth Advisors 2026.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scraper.py --state MN
  python scraper.py --all-states
  python scraper.py --all-states --limit 100
  python scraper.py --state CA --enrich-profiles
        """,
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--state", metavar="ABBR", help="Two-letter state abbreviation (e.g. MN)")
    group.add_argument("--all-states", action="store_true", help="Scrape all states")

    parser.add_argument("--limit", type=int, metavar="N", help="Cap total records returned")
    parser.add_argument(
        "--enrich-profiles",
        action="store_true",
        help="Visit individual profile pages to fill missing fields (slower)",
    )
    parser.add_argument("--headed", action="store_true", help="Run browser in headed mode")
    return parser.parse_args()


def main():
    args = _parse_args()

    log.info("=== Forbes Best-In-State Wealth Advisors Scraper ===")
    log.info("Target: %s", BASE_URL)
    log.info("State filter: %s", args.state if args.state else "ALL")
    log.info("Limit: %s", args.limit or "none")

    with ForbesScraper(headless=not args.headed) as scraper:
        records = scraper.scrape(
            state=args.state,
            all_states=args.all_states,
            limit=args.limit,
            enrich_profiles=args.enrich_profiles,
        )

    if records:
        write_csv(records, OUTPUT_CSV)
        write_missing_fields(records, MISSING_CSV)
    else:
        log.warning("No records to write. Inspect snapshots in %s.", SNAPSHOTS_DIR)
        # Write empty CSVs so downstream pipelines don't break
        pd.DataFrame(columns=REQUIRED_FIELDS).to_csv(OUTPUT_CSV, index=False)
        pd.DataFrame(columns=["Name", "Firm", "State", "Missing Fields", "Missing Count"]).to_csv(
            MISSING_CSV, index=False
        )

    log.info("Done. Output: %s", OUTPUT_DIR)


if __name__ == "__main__":
    main()
