# Forbes Best-In-State Wealth Advisors Scraper

Scrapes the **2026 Forbes Best-In-State Wealth Advisors** list and exports structured CSV data.

Only publicly visible data is collected. No paywalls, logins, CAPTCHAs, or access controls are bypassed.

---

## Requirements

- Python 3.10+
- Playwright (Chromium)

```bash
pip install -r requirements.txt
playwright install chromium
```

---

## Usage

### Scrape a single state (test mode)
```bash
python scraper.py --state MN
```

### Scrape all states
```bash
python scraper.py --all-states
```

### Cap the number of records returned
```bash
python scraper.py --all-states --limit 100
python scraper.py --state CA --limit 25
```

### Visit individual profile pages to fill missing fields
```bash
python scraper.py --state MN --enrich-profiles
```

### Run with a visible browser (useful for debugging)
```bash
python scraper.py --state MN --headed
```

---

## Output

| File | Description |
|------|-------------|
| `output/forbes_best_in_state_2026_raw.csv` | Main results, one row per advisor |
| `output/missing_fields.csv` | Records with one or more "Unknown" fields |
| `snapshots/*.html` | Raw HTML snapshots of every page visited |
| `logs/scraper_<timestamp>.log` | Full run log |

### CSV Columns

| Column | Notes |
|--------|-------|
| Name | Full advisor name |
| Firm | Employer / brokerage |
| City | Office city |
| State | Two-letter state abbreviation |
| Region | Forbes-defined geographic region |
| Minimum Account Size For New Business | Dollar threshold for new clients |
| Team Assets | AUM for the advisor's team |
| Typical Net Worth Of Relationships | Median/typical client net worth |
| Typical Size Household Accounts | Typical household account size |
| Forbes Profile URL | Direct link to the advisor's Forbes page |
| Source Notes | Provenance, extraction method, and scrape date |

---

## Architecture

```
scraper.py
├── ForbesScraper           # Playwright browser lifecycle + page navigation
│   ├── _load_list_page     # Navigate to Forbes list, scroll to load lazy rows
│   ├── _parse_list_rows    # Two extraction strategies (JSON-LD / DOM table)
│   ├── _try_extract_embedded_json  # Pulls from window.__NEXT_DATA__ etc.
│   ├── _try_extract_table_rows     # Falls back to CSS selector table parsing
│   └── _enrich_from_profile        # Optional: visit each profile for more detail
├── _deduplicate            # Dedup by Name + Firm + City + State
├── write_csv               # pandas → CSV
└── write_missing_fields    # Report records with Unknown fields
```

### Extraction strategies

The scraper tries two strategies in order:

1. **Embedded JSON** — Forbes often embeds full list data in `window.__NEXT_DATA__` or `window.__INITIAL_STATE__`. This is the fastest path and produces the most complete records.
2. **DOM table parsing** — Falls back to CSS selectors against the rendered HTML table/grid if no embedded JSON is found.

If the Forbes page structure changes, check the latest HTML snapshot in `snapshots/` and update the selectors in `_try_extract_table_rows` or the JSON traversal in `_flatten_json_data`.

---

## Rate limits & politeness

| Setting | Value |
|---------|-------|
| Page load wait | 4 s |
| Scroll pause | 1.5 s per scroll step |
| Between profile pages | 2 s |
| Image/font requests | Blocked (reduces load on server) |

---

## Troubleshooting

**Got 0 records?**
1. Open `snapshots/` — the latest `list_page_*.html` shows what the browser actually received.
2. Check whether Forbes now requires a login to view the list.
3. Run with `--headed` to watch the browser and see any pop-ups or CAPTCHA.
4. The site structure may have changed — update the CSS selectors or JSON key names accordingly.

**Missing fields?**
Run with `--enrich-profiles` to visit each advisor's profile page and fill in additional details. This is slower (~2 s per advisor) but increases field coverage.

---

## Ethical & legal notes

- This tool scrapes only the publicly accessible Forbes list page.
- It does not circumvent any authentication, paywall, or CAPTCHA.
- It respects conservative rate limits and blocks media downloads to reduce server load.
- Users are responsible for complying with Forbes' Terms of Service and applicable law.
