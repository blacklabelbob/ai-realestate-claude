# Property Analysis Archive

**Internal store for every property we analyze.** Share-ready source of truth — keep it organized.

## Convention

Every property gets ONE subfolder, named by its report slug (kebab-case address):

```
properties/
  <slug>/                         e.g. 583-sentinel-rd-moorestown-nj/
    PROPERTY-ANALYSIS-*.md        composite summary (score, verdict, strengths/risks)
    PROPERTY-COMPS-*.md           comparable sales
    PROPERTY-RENTAL-*.md          rental income & cash flow
    PROPERTY-NEIGHBORHOOD-*.md    schools, crime, walkability, demographics
    PROPERTY-INVEST-*.md          buy-hold / BRRRR / flip
    PROPERTY-MARKET-*.md          local market conditions
    PROPERTY-REPORT-*.pdf         client-ready PDF
    property-data-*.json          structured data (feeds the website)
```

## Wiring to the website

The live site reads the **structured JSON** copied into `lib/reports/data/<slug>.raw.json`
and the **PDF** copied into `public/reports/<slug>.pdf`. When you add a new property:

1. Drop the analysis files in a new `properties/<slug>/` folder (this archive).
2. Copy the JSON → `lib/reports/data/<slug>.raw.json` and the PDF → `public/reports/<slug>.pdf`.
3. Add a typed entry in `lib/reports/data/<slug>.ts` and register it in `lib/reports/index.ts`.

The slug must match across all three so routes, downloads, and data stay in sync.

## Current properties
- `583-sentinel-rd-moorestown-nj/` — flagship, MLS-backed (NJBL398454). Score 59, HOLD/WATCH.
- `downtown-austin-condo-78701/` — illustrative sample (address not independently verified). Score 54, HOLD/VERIFY.
