# Changelog — ai-realestate-claude

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Auto-initialized by changelog-guard hook.

## [Unreleased]

### Added — 2026-06-01 — Lead-magnet / SaaS transformation
- **Hosted, on-site sample reports** — `/reports` gallery + `/reports/[slug]` interactive report viewer rendering the real 5-agent analysis (score gauge, comps, cash-flow model, neighborhood, investment scenarios, recommendation, risk factors) from typed data. No more "email-only" — reports live on the site.
- **Email gate that unlocks in place** (`components/EmailGate.tsx`) — captures the lead, then reveals the deep financial sections right on the page via localStorage; no off-site redirect, no inbox dead-end.
- **Lead capture API** (`app/api/lead/route.ts`) — persists `{email,source,address,ts}`, forwards to `LEAD_WEBHOOK_URL` (GHL/n8n) when set, best-effort local `.leads/leads.jsonl` in dev.
- **Pricing justification** — rebuilt `Pricing.tsx` with per-tier ROI rationale, a sourced "cost of being wrong" stat band (6 figures, each linking to Clever/Bankrate/Bay Mgmt/PR Newswire), and an interactive `RoiCalculator`. `content/pricing-justification.md` holds 22 URL-verified stats.
- **Satellite / aerial imagery** (`components/report/PropertySatellite.tsx`) — Google Static Maps hybrid view with graceful no-key fallback (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`).
- **Methodology section** in every report — explains the weighting logic + evidence discipline while keeping the engine proprietary.
- **Market evidence ("show your work")** (`components/report/MarketEvidence.tsx`) — trailing price/YoY, inventory, months-supply, DOM, net-migration figures, demand drivers, 12-mo forecast, and the market-score math — every row links to its source (Redfin/Zillow/Homes.com/FRED/Tax Foundation).
- **Internal verify-my-math pack** — `properties/<slug>/DATA-PROVENANCE.md` maps each headline number → source → arithmetic (flags two NOI-definition reconciliations for the engine).
- **Data layer** — `lib/reports/` (types, 2 typed properties, registry); `SOL.md` Ralph-loop spec; `Nav` added site-wide.

### Changed — 2026-06-01
- Organized loose `PROPERTY-*` files into per-property folders: `properties/<slug>/` (+ `properties/README.md` documenting the convention and website wiring).
- Wired Hero / PdfPreview / LiveDemo / UseCases to the real hosted reports and PDFs.

### Added — 2026-05-10
- **First end-to-end `/realestate analyze` run on a real address** — 583 Sentinel Rd, Moorestown NJ 08057 (Stanwick Glen). 5 parallel agents (comps/rental/neighborhood/invest/market) → composite Property Score 59/B/HOLD-WATCH. Verdict: strong house + premium suburb, but NJ 2.81% effective property tax kills leveraged investment math (-$3,200/mo cash flow). Best fit: owner-occupant or all-cash buyer.
- `PROPERTY-ANALYSIS-583-Sentinel-Rd-Moorestown.md` — synthesis with composite score, decision tree, sub-report links
- `PROPERTY-COMPS-583-Sentinel-Rd-Moorestown.md` — 5 same-street comps, FMV $800K–$950K (mid $870K), Score 74
- `PROPERTY-RENTAL-583-Sentinel-Rd-Moorestown.md` — 3-scenario cash flow, cap rate 1.77%, Score 22
- `PROPERTY-NEIGHBORHOOD-583-Sentinel-Rd-Moorestown.md` — Niche A+ schools (#16 NJ), Score 86
- `PROPERTY-INVEST-583-Sentinel-Rd-Moorestown.md` — Buy/BRRRR/Flip strategies, Score 42
- `PROPERTY-MARKET-Moorestown-08057.md` — 08057 +4-6.5% YoY, SALT 2030 cliff risk, Score 72
- `PROPERTY-REPORT-583-Sentinel-Rd-Moorestown.pdf` — client-ready 6-page PDF
- `property-data-583-sentinel.json` — JSON payload schema for the PDF generator (reusable template)
- `V0-DEV-PROMPT.md` — strategic brief that produced the v0.dev landing page (history)

### Changed — 2026-05-10
- `.gitignore` — un-ignored `PROPERTY-*.pdf` and `PROPERTY-*.md` so analysis files persist to GitHub and feed the live Vercel deployment. Comment block explains how to re-enable for batch runs.

### Salvaged from cancelled run (2026-05-09)
- `PROPERTY-COMPS-123-Main-St-Austin.md` — placeholder address; kept per "salvage completed work" rule
- `PROPERTY-RENTAL-123-Main-St-Austin.md` — same
- `PROPERTY-INVEST-123-Main-St-Austin.md` — same
- `PROPERTY-NEIGHBORHOOD-123-Main-St-Austin.md` — same

### Added — 2026-05-09
- Project changelog initialized.

