"""
Minnesota test harness.

Serves a local HTML page that mirrors Forbes' list structure, then runs the
full scraper pipeline (parsing → dedup → CSV export → missing-fields report)
against it. All results are reported to stdout.
"""

import csv
import json
import sys
import threading
import time
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from io import StringIO
from pathlib import Path

# Ensure scraper module is importable
sys.path.insert(0, str(Path(__file__).parent))

# --------------------------------------------------------------------------
# Mock Forbes page — realistic HTML that mirrors Forbes' Next.js list page.
# Includes __NEXT_DATA__ embedded JSON (primary extraction path) and a
# rendered HTML table (fallback extraction path).
# --------------------------------------------------------------------------

# Real MN advisors confirmed from public press releases (Matt Gulbransen: #1 MN 2026,
# Pine Grove Financial Group; David A. Olson: Morgan Stanley Rochester). Remaining
# entries are plausible placeholders to exercise the full pipeline.
MN_ADVISORS = [
    {
        # #1 Minnesota — confirmed via PR Newswire / Forbes 2026
        "name": "Matt Gulbransen",
        "firm": "Pine Grove Financial Group",
        "city": "Minneapolis",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$3,000,000",
        "teamAssets": "$2.1B",
        "typicalNetWorth": "$10,000,000+",
        "typicalHousehold": "$5,000,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:matt-gulbransen",
    },
    {
        # Confirmed — Morgan Stanley Rochester, Forbes 2026
        "name": "David A. Olson",
        "firm": "Morgan Stanley",
        "city": "Rochester",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$1,000,000",
        "teamAssets": "$1.3B",
        "typicalNetWorth": "$5,000,000",
        "typicalHousehold": "$2,000,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:david-a-olson",
    },
    {
        "name": "Lisa Hanson",
        "firm": "Ameriprise Financial",
        "city": "St. Paul",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$500,000",
        "teamAssets": "$620M",
        "typicalNetWorth": "$3,000,000",
        "typicalHousehold": "$1,500,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:lisa-hanson",
    },
    {
        "name": "Kevin Nguyen",
        "firm": "UBS Financial Services",
        "city": "Minneapolis",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$750,000",
        "teamAssets": "$1.1B",
        "typicalNetWorth": "$6,000,000",
        "typicalHousehold": "$2,500,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:kevin-nguyen",
    },
    {
        "name": "Sarah Lindqvist",
        "firm": "Edward Jones",
        "city": "Rochester",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "",          # intentionally missing
        "teamAssets": "$430M",
        "typicalNetWorth": "",             # intentionally missing
        "typicalHousehold": "$900,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:sarah-lindqvist",
    },
    {
        "name": "Mark Petersen",
        "firm": "Wells Fargo Advisors",
        "city": "Bloomington",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$1,500,000",
        "teamAssets": "",                  # intentionally missing
        "typicalNetWorth": "$8,000,000",
        "typicalHousehold": "$3,500,000",
        "url": "",                         # intentionally missing
    },
    {
        "name": "Jennifer Olson",
        "firm": "Morgan Stanley",
        "city": "Eden Prairie",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$2,500,000",
        "teamAssets": "$2.3B",
        "typicalNetWorth": "$12,000,000",
        "typicalHousehold": "$6,000,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:jennifer-olson",
    },
    {
        "name": "Robert Magnusson",
        "firm": "Merrill Lynch",
        "city": "Wayzata",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$3,000,000",
        "teamAssets": "$3.1B",
        "typicalNetWorth": "$15,000,000",
        "typicalHousehold": "$8,000,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:robert-magnusson",
    },
    # Duplicate of Gulbransen — should be removed by dedup logic
    {
        "name": "Matt Gulbransen",
        "firm": "Pine Grove Financial Group",
        "city": "Minneapolis",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$3,000,000",
        "teamAssets": "$2.1B",
        "typicalNetWorth": "$10,000,000+",
        "typicalHousehold": "$5,000,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:matt-gulbransen",
    },
    {
        "name": "Amanda Torres",
        "firm": "Raymond James",
        "city": "St. Cloud",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$250,000",
        "teamAssets": "$310M",
        "typicalNetWorth": "$1,500,000",
        "typicalHousehold": "$750,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:amanda-torres",
    },
    {
        "name": "William Sorenson",
        "firm": "Piper Sandler",
        "city": "Minneapolis",
        "state": "MN",
        "region": "Minnesota",
        "minimumAccountSize": "$5,000,000",
        "teamAssets": "$4.7B",
        "typicalNetWorth": "$25,000,000",
        "typicalHousehold": "$12,000,000",
        "url": "/lists/best-in-state-wealth-advisors/#tab:states_name:william-sorenson",
    },
]

BASE_URL_HOST = "http://localhost:9742"


def _build_mock_html() -> str:
    """Construct an HTML page that mirrors Forbes' Next.js list page structure."""

    # Embed as window.__NEXT_DATA__ exactly like Forbes does
    next_data = {
        "props": {
            "pageProps": {
                "listData": {
                    "listItems": MN_ADVISORS
                }
            }
        }
    }

    # Build an HTML table as the DOM fallback
    rows_html = ""
    for a in MN_ADVISORS:
        profile_href = f"{BASE_URL_HOST}{a['url']}" if a["url"] else ""
        link = f'<a href="{profile_href}">{a["name"]}</a>' if profile_href else a["name"]
        rows_html += f"""
        <tr>
            <td>{link}</td>
            <td>{a['firm']}</td>
            <td>{a['city']}</td>
            <td>{a['state']}</td>
            <td>{a['region']}</td>
            <td>{a['minimumAccountSize']}</td>
            <td>{a['teamAssets']}</td>
            <td>{a['typicalNetWorth']}</td>
            <td>{a['typicalHousehold']}</td>
        </tr>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Forbes Best-In-State Wealth Advisors 2026</title>
  <script id="__NEXT_DATA__" type="application/json">{json.dumps(next_data)}</script>
  <script>
    window.__NEXT_DATA__ = {json.dumps(next_data)};
  </script>
</head>
<body>
  <h1>Best-In-State Wealth Advisors 2026</h1>
  <table class="listTable">
    <thead>
      <tr>
        <th>Name</th><th>Firm</th><th>City</th><th>State</th><th>Region</th>
        <th>Minimum Account Size</th><th>Team Assets</th>
        <th>Typical Net Worth</th><th>Typical Household</th>
      </tr>
    </thead>
    <tbody>
      {rows_html}
    </tbody>
  </table>
</body>
</html>"""


# --------------------------------------------------------------------------
# Local HTTP server
# --------------------------------------------------------------------------

class _Handler(BaseHTTPRequestHandler):
    html = ""

    def do_GET(self):
        body = self.html.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *_):
        pass  # suppress server logs


def _start_server(html: str, port: int = 9742):
    _Handler.html = html
    server = HTTPServer(("127.0.0.1", port), _Handler)
    t = threading.Thread(target=server.serve_forever, daemon=True)
    t.start()
    return server


# --------------------------------------------------------------------------
# Scraper pipeline (re-uses scraper.py functions directly)
# --------------------------------------------------------------------------

from scraper import (
    ForbesScraper,
    _deduplicate,
    write_csv,
    write_missing_fields,
    REQUIRED_FIELDS,
    OUTPUT_CSV,
    MISSING_CSV,
)


def run_test():
    html = _build_mock_html()
    server = _start_server(html)
    time.sleep(0.3)  # let server bind

    local_url = f"{BASE_URL_HOST}/"
    print(f"\n{'='*60}")
    print("  Forbes Best-In-State Advisors — Minnesota Test Run")
    print(f"{'='*60}\n")
    print(f"Mock server: {local_url}")
    print(f"Advisors in mock data (incl. 1 duplicate): {len(MN_ADVISORS)}\n")

    # ----------------------------------------------------------------
    # Monkey-patch BASE_URL so the scraper hits localhost
    # ----------------------------------------------------------------
    import scraper as _scraper_mod
    original_url = _scraper_mod.BASE_URL
    _scraper_mod.BASE_URL = local_url

    records = []
    errors = []

    try:
        with ForbesScraper(headless=True) as scraper:
            # Patch the instance method to use our local URL
            original_load = scraper._load_list_page

            def patched_load(page, state_filter=None):
                import scraper as m
                page.goto(local_url, wait_until="domcontentloaded", timeout=30_000)
                time.sleep(1)
                scraper._scroll_to_bottom(page, max_scrolls=2)
                html_content = page.content()
                from scraper import _save_snapshot
                _save_snapshot(html_content, "list_page_mock")
                return html_content

            scraper._load_list_page = patched_load

            page = scraper._new_page()

            try:
                scraper._load_list_page(page)
                records = scraper._parse_list_rows(page, state_filter="MN", limit=None)
            except Exception as exc:
                errors.append(f"List parse error: {exc}")
            finally:
                page.close()

    except Exception as exc:
        errors.append(f"Browser launch error: {exc}")

    _scraper_mod.BASE_URL = original_url

    # ----------------------------------------------------------------
    # Post-process
    # ----------------------------------------------------------------
    pre_dedup = len(records)
    records = _deduplicate(records)

    # ---- 1. Profile URLs found ----
    urls_found = [r for r in records if r.get("Forbes Profile URL", "Unknown") != "Unknown"]
    print(f"[1] PROFILE URLs FOUND")
    print(f"    Found: {len(urls_found)} / {len(records)} records have a URL")
    for r in urls_found:
        print(f"    • {r['Name']:<30}  {r['Forbes Profile URL']}")

    # ---- 2. Records exported ----
    print(f"\n[2] RECORDS EXPORTED")
    print(f"    Raw advisors in mock data : {len(MN_ADVISORS)}")
    print(f"    After state filter        : {pre_dedup}")
    print(f"    After deduplication       : {len(records)}  (removed {pre_dedup - len(records)} duplicate(s))")

    if records:
        write_csv(records, OUTPUT_CSV)
        write_missing_fields(records, MISSING_CSV)
        print(f"    CSV written to            : {OUTPUT_CSV}")
        print(f"    Missing-fields report     : {MISSING_CSV}")

    # ---- 3. Missing fields analysis ----
    print(f"\n[3] MISSING FIELDS ANALYSIS")
    field_miss_count: dict[str, int] = {f: 0 for f in REQUIRED_FIELDS}
    for rec in records:
        for f in REQUIRED_FIELDS:
            if rec.get(f, "Unknown") == "Unknown":
                field_miss_count[f] += 1

    ranked = sorted(field_miss_count.items(), key=lambda x: -x[1])
    for field, count in ranked:
        bar = "█" * count
        pct = count / len(records) * 100 if records else 0
        status = f"{count}/{len(records)} ({pct:.0f}%)"
        print(f"    {field:<45} {status:<15} {bar}")

    # ---- 4. Errors / blocked requests ----
    print(f"\n[4] ERRORS / BLOCKED REQUESTS")
    if errors:
        for e in errors:
            print(f"    ERROR: {e}")
    else:
        print("    None — run completed cleanly.")
    print(f"    (Media requests — images/fonts — were blocked by design)")
    print(f"    Network: forbes.com is outside sandbox allowlist;")
    print(f"             test ran against local mock at {local_url}")

    # ---- 5. CSV preview ----
    print(f"\n[5] FIRST 10 CSV ROWS (preview)")
    if OUTPUT_CSV.exists() and records:
        import pandas as pd
        df = pd.read_csv(OUTPUT_CSV)
        preview_cols = ["Name", "Firm", "City", "State", "Team Assets", "Forbes Profile URL"]
        available = [c for c in preview_cols if c in df.columns]
        pd.set_option("display.max_colwidth", 35)
        pd.set_option("display.width", 140)
        print(df[available].head(10).to_string(index=True))
    else:
        print("    No CSV output to preview.")

    print(f"\n{'='*60}")
    print("  Test complete")
    print(f"{'='*60}\n")

    server.shutdown()


if __name__ == "__main__":
    run_test()
