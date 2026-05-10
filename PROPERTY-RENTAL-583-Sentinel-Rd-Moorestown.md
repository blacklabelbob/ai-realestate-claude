# Rental Income & Cash Flow Analysis
## 583 Sentinel Rd, Moorestown, NJ 08057

**Analyst:** AI Real Estate Rental Income & Cash Flow Analyst
**Analysis Date:** May 9, 2026
**Property Type:** Single-Family Residence (SFR)
**Strategy Evaluated:** Long-Term Rental (LTR) — primary | Short-Term Rental (STR) — secondary
**Confidence:** Moderate (rental comps from public listing aggregators; subject property details from Redfin/Zillow/Homes.com cached previews — direct MLS verification recommended)

---

## 1. Subject Property Snapshot

| Attribute | Value | Source |
|---|---|---|
| Address | 583 Sentinel Rd, Moorestown, NJ 08057 | Redfin / Zillow |
| Property type | Single-Family Residence | Redfin |
| Bedrooms / Baths | 5 BR / 3 BA | Homes.com |
| Living area | 2,817 sqft | Redfin / Homes.com |
| Year built | 1981 (~45 yrs old) | Redfin |
| Last sold price | **$779,900** (~Nov 2025, per "sold 6 months ago" Homes.com cache) | Homes.com |
| $/sqft (purchase) | $277/sqft | Derived |
| HOA | None indicated for SFR on Sentinel Rd | Public listing data |
| School district | Moorestown Township School District (high-rated) | Public records |
| Lot size | Not retrieved (Zillow/Redfin blocked 403) — **assumption: ~0.25-0.4 acre suburban lot** | n/a |
| County | Burlington County, NJ | Public records |

> **Data gap flag:** Zillow and Redfin returned HTTP 403 to direct fetches, so Zestimate, Rent Zestimate, exact lot size, and confirmed annual tax bill were not directly extracted. Figures below use the $779,900 sold price as the underwriting basis and apply Moorestown's published 2.75-2.81% effective tax rate.

---

## 2. Rental Comparables — Moorestown 08057

Moorestown's rental market skews toward apartments and townhomes; true SFR rental supply is thin (Apartments.com lists 14 houses; Zillow 5; Rent.com aggregates 35-46). The handful of sub-$3,500 listings publicly visible are mostly 3 BR / 1-2 BA homes ≤ 1,300 sqft. Pricing scales steeply for 4-5 BR homes >2,500 sqft.

### 2a. Public SFR Rental Comps (Moorestown 08057)

| # | Address | Beds / Baths | Sqft | Rent / mo | $/sqft / mo | Source |
|---|---|---|---|---|---|---|
| 1 | 519 N Lincoln Ave | 3 / 2 | 1,300 | $3,000 | $2.31 | Apartments.com |
| 2 | 315 Chestnut St | 4 / 3 | 3,226 | $3,500 | $1.08 | Apartments.com |
| 3 | 103 Congressional Ct | 2 / 2 | 1,866 | $3,400 | $1.82 | Apartments.com |
| 4 | 191 Perry Ave | 3 / 1 | 1,000 | $2,700 | $2.70 | Apartments.com |
| 5 | 607 Devon Rd | 3 / 1 | 1,232 | $2,600 | $2.11 | Apartments.com |

**Comp set average $/sqft/mo:** ~$2.00 (range $1.08-$2.70). Larger 4 BR comp (#2 — Chestnut, 3,226 sqft) rents at $1.08/sqft, indicating the 5BR/2,800 sqft tier likely lands $1.20-$1.50/sqft.

### 2b. Market-Wide Reference Points

- **Moorestown average house rent:** $2,887/mo (Apartments.com aggregate)
- **Moorestown median rent (all types, Feb 2025):** $3,000/mo (Zumper)
- **Apartments.com SFR range:** $1,500-$4,700/mo across 46 listings
- **Top-of-market SFR cap:** ~$4,500-$4,800/mo for premium 4-5 BR

### 2c. Rent Estimate — 583 Sentinel Rd (5 BR / 3 BA / 2,817 sqft)

A 5 BR / 3 BA / 2,817 sqft 1981 SFR in 08057 with Moorestown schools sits in the **upper quartile** of the local SFR rental market. Comparable to listing #2 (315 Chestnut, 4BR/3BA/3,226sqft @ $3,500), but with one extra bedroom and somewhat smaller — likely commands a small premium.

| Scenario | Monthly Rent | Annual Gross Rent | Logic |
|---|---|---|---|
| **Conservative** | **$3,400** | $40,800 | Slight discount to Chestnut comp; assumes 1981 condition / dated finishes / longer DOM |
| **Moderate** | **$3,800** | $45,600 | At-market for 5BR Moorestown SFR; ~$1.35/sqft (in line with comp scale) |
| **Optimistic** | **$4,300** | $51,600 | Top of market; assumes recent updates, premium block, strong school-year demand |

**Underwriting case = Conservative ($3,400/mo · $40,800/yr).** All metrics below use this figure unless noted.

---

## 3. Acquisition & Financing Assumptions

| Input | Value | Notes |
|---|---|---|
| Purchase price | $779,900 | Most recent sale (Nov 2025) — also serves as basis for tax assessment going forward |
| Down payment (25%) | $194,975 | Standard NJ investor DSCR / conventional |
| Loan amount | $584,925 | |
| Interest rate | 7.00% | 30-yr fixed, investor SFR |
| Term | 360 months | |
| Closing costs (3%) | ~$23,400 | NJ has high recording/title fees |
| **Total cash to close** | **~$218,375** | Down payment + closing |
| Monthly P&I | **$3,892** | PMT(0.07/12, 360, 584925) |

> Mortgage P&I alone ($3,892/mo) **already exceeds the conservative rent ($3,400)** before any operating expense. This is the headline finding — see Section 6.

---

## 4. Operating Expense Model (Annual)

### 4a. Property Taxes — The Killer Variable

Moorestown's effective tax rate is **2.75% (2024) → 2.81% (2025)**, with the school district consuming ~66.5% of the bill. The town's median tax bill is $10,106 on a median home value of $369,300. At a $779,900 basis, the projected annual tax is significantly higher.

| Method | Annual Tax | Monthly |
|---|---|---|
| 2.75% × $779,900 | $21,447 | $1,787 |
| 2.81% × $779,900 | $21,915 | $1,826 |
| **Conservative (use 2.81%)** | **$21,915** | **$1,826** |

> Reassessment risk: NJ municipalities reassess on sale. The new $779,900 sale will likely re-anchor the assessment near transaction price. Older Sentinel Rd assessments may have been lower; **expect a tax step-up** at the next reval. Budgeting at 2.81% is appropriate.

### 4b. Full Annual Expense Build

| Line Item | % / Basis | Annual | Monthly | Source / Logic |
|---|---|---|---|---|
| Property tax | 2.81% × $779,900 | $21,915 | $1,826 | NJ effective rate (Ownwell, NJ DCA 2025) |
| Insurance (landlord DP-3) | NJ avg + 20% landlord uplift | $2,200 | $183 | $1,800 base × 1.2; older home + LL coverage |
| Vacancy | 6% of GSI | $2,448 | $204 | Mid-range 5-8%; tight Moorestown SFR supply |
| Repairs & Maintenance | 9% of GSI | $3,672 | $306 | 1981 build = older-home tier (8-10%) |
| Property management | 9% of GSI | $3,672 | $306 | Standard NJ SFR mgmt fee (8-10%) |
| CapEx reserve | 5% of GSI | $2,040 | $170 | Roof / HVAC / windows aging |
| HOA | $0 | $0 | $0 | None on Sentinel Rd SFR |
| Lawn / snow (between tenants) | flat | $600 | $50 | NJ winters; vacancy periods |
| Landlord registration / misc | flat | $150 | $13 | Moorestown registration required (no fee published; admin only) |
| **Total OpEx (excl. debt)** | | **$36,697** | **$3,058** | |
| OpEx ratio (% of GSI) | | **89.9%** | | Driven entirely by NJ taxes |

---

## 5. Cash Flow Waterfall (Conservative Scenario)

```
Gross Scheduled Rent (GSI)           $40,800/yr     $3,400/mo
  – Vacancy (6%)                     ($2,448)        ($204)
= Effective Gross Income (EGI)       $38,352         $3,196
  – Operating Expenses (ex-vacancy)  ($34,249)      ($2,854)
= Net Operating Income (NOI)         $4,103          $342
  – Debt Service (P&I)               ($46,704)     ($3,892)
= Pre-Tax Cash Flow                 ($42,601)     ($3,550)
```

### 5a. Three-Scenario Cash Flow Summary

| Metric | Conservative ($3,400) | Moderate ($3,800) | Optimistic ($4,300) |
|---|---|---|---|
| Gross annual rent | $40,800 | $45,600 | $51,600 |
| Vacancy (6%) | ($2,448) | ($2,736) | ($3,096) |
| OpEx (taxes, ins, R&M, mgmt, capex, misc) | ($34,249) | ($34,825) | ($35,545) |
| **NOI** | **$4,103** | **$8,039** | **$12,959** |
| Debt service P&I | ($46,704) | ($46,704) | ($46,704) |
| **Pre-tax cash flow (annual)** | **($42,601)** | **($38,665)** | **($33,745)** |
| **Pre-tax cash flow (monthly)** | **($3,550)** | **($3,222)** | **($2,812)** |

> **Every scenario is deeply cash-flow negative.** Even at top-of-market rent ($4,300/mo), the property bleeds ~$2,800/mo.

---

## 6. Key Investment Metrics

All metrics use the $779,900 basis and **conservative $3,400/mo rent** unless noted. (Moderate scenario in parens.)

| Metric | Formula | Result | Rule of Thumb |
|---|---|---|---|
| **Gross Rent Multiplier (GRM)** | Price ÷ Annual GSI | **19.1x** ($779,900 ÷ $40,800) — **22.6x at moderate** | <10 = strong; >15 = weak |
| **1% Rule** | Monthly rent ÷ price | **0.44%** ($3,400 ÷ $779,900) — **0.49% moderate** | ≥1.0% = pass; this is a **major fail** |
| **Cap Rate (NOI / Price)** | $4,103 ÷ $779,900 | **0.53%** — **1.03% moderate, 1.66% optimistic** | 5-8% target; sub-2% = trophy/appreciation play only |
| **Cash-on-Cash Return** | Annual CF ÷ Cash invested | **-19.5%** ($-42,601 ÷ $218,375) — **-17.7% mod, -15.5% opt** | 8-12% target; negative = subsidy |
| **DSCR (NOI / Debt Service)** | $4,103 ÷ $46,704 | **0.09** — **0.17 mod, 0.28 opt** | 1.20+ for DSCR loans; **uninsurable as DSCR loan** |
| **Break-even occupancy** | Total expenses ÷ GSI | **>200%** | Cannot break even at any occupancy at conservative rent |
| **Break-even rent (cover PITI + OpEx)** | (Debt + OpEx) ÷ 12 | **~$6,950/mo** | Roughly 2x the achievable market rent |

> **Conclusion:** 583 Sentinel Rd does **not work as a financed long-term rental**. It only pencils as: (a) all-cash purchase (cap rate still only 0.5-1.7%, but no debt drag), (b) personal/owner-occupied home, or (c) appreciation play with willingness to subsidize $30-45K/yr from external income.

---

## 7. STR vs. LTR Analysis

### 7a. STR Viability — Moorestown

| Indicator | Finding | Source |
|---|---|---|
| Active Airbnb listings (Moorestown) | **5** total town-wide | Airbnb city page |
| Vrbo listings | Sparse | Vrbo |
| Demand drivers | Suburban bedroom community; no tourism, no convention venue, no resort | Market knowledge |
| Proximity to Philadelphia | 15 min — but Philly STR market is its own primary destination | Airbnb |
| Comparable Philly metro STR | $154 ADR, 56% occupancy, $17,526/mo for in-Philly SFRs | Airdna / Hospitable |
| Moorestown municipal STR ordinance | **No specific STR ordinance found** in eCode360 search | eCode360 |
| Landlord registration | **Required** for all rentals (filed with Municipal Clerk within 30 days) | Moorestown.nj.us |
| HOA / deed restrictions | Unknown for Sentinel Rd specifically | n/a |

**STR verdict:** **Not viable.** Moorestown is a low-demand STR market (5 listings town-wide), Burlington County draws no leisure traffic, and even modeling Philadelphia-tier performance ($17K/mo) onto a suburb with no demand is unrealistic. STR strategy is a **non-starter** here.

### 7b. LTR vs. STR Side-by-Side

| Strategy | Realistic Monthly Gross | Realistic Monthly NOI | Recommended? |
|---|---|---|---|
| LTR (conservative) | $3,400 | $342 | Negative cash flow but only path |
| LTR (moderate) | $3,800 | $670 | Same — negative cash flow with debt |
| STR | Likely <$2,000 effective (low occupancy + furnishing/cleaning costs) | Negative | **No** |
| Mid-term (30-90 day, corporate / traveling nurse) | $4,500-$5,500 | Possibly small positive NOI | **Worth exploring** if owner can self-manage; Cooper / Virtua Hospital, Lockheed Martin Moorestown, Subaru HQ commuter demand |

> **MTR (medium-term rental)** is the only above-LTR strategy with any merit — Moorestown sits near major employers (Lockheed Martin, Subaru HQ, Cooper Health). Furnished 30-90 day rentals could push $5K+/mo. Still likely cash-flow negative once debt is added, but the gap narrows.

---

## 8. Income Potential Score: **22 / 100** — POOR

### Scoring Breakdown

| Factor | Weight | Score (0-10) | Weighted |
|---|---|---|---|
| Rent-to-price ratio (1% rule) | 20% | 1 | 2.0 |
| Cap rate | 20% | 1 | 2.0 |
| Cash-on-cash return | 20% | 1 | 2.0 |
| Cash flow positive? | 15% | 0 | 0.0 |
| Rental demand depth | 10% | 6 | 6.0 |
| Tax burden (lower = better) | 10% | 1 | 1.0 |
| STR optionality | 5% | 1 | 1.0 |
| **Total** | **100%** | | **22 / 100** |

### Reasoning

This property fails every standard income-investor screen by a wide margin. The **2.81% effective property tax** consumes 53% of gross rent before any other expense. With debt at 7%, monthly P&I alone exceeds achievable rent. Cap rate of 0.5-1.7% is **5-15x below** target for an income property. The only redeeming factor is rental demand depth — Moorestown's strong schools, low SFR rental supply, and HHI demographics ensure quick lease-up at market rent. But the math doesn't work: this is an **owner-occupant home** that happens to be in a low-yield, high-tax town. As an investment, it's a wealth-preservation / appreciation bet, not an income asset.

### Comparable Market Context
A property scoring well (75+) on income potential typically shows ≥0.8% rent-to-price, cap rate ≥5%, CoC ≥6%, and pre-tax cash flow ≥$300/mo. 583 Sentinel hits none of these.

---

## 9. Top 3 Risks

### Risk 1 — Property Tax Reassessment Spike (HIGH)
NJ municipalities frequently reset assessments based on recent sale price. The $779,900 transaction will likely **anchor the next assessment near full sale value**, locking in $21K+/yr taxes. Any reval before 2030 (Moorestown's last full reval guidance) could push the bill higher still. **Tax growth has run 2-3%/yr**, so by year 5 expect $24-25K/yr. This is the single largest threat to NOI.
*Mitigation:* File annual appeal by Jan 15 with comp evidence; budget for 3% annual tax escalator.

### Risk 2 — Debt-Service Gap & Rate Lock-In (HIGH)
At 7% / 25% down, monthly P&I ($3,892) exceeds even moderate-scenario rent ($3,800). The investor must subsidize **$2,800-$3,550/mo from external income** indefinitely, OR commit to all-cash to remove debt drag. Rate-cut refi could narrow the gap (a drop to 5.5% saves ~$575/mo) but won't make it cash-positive. If held leveraged, **5-year cumulative subsidy = $170K-$215K** — wiping out most or all expected appreciation.
*Mitigation:* Reconsider leverage; evaluate 50%+ down or all-cash; model break-even refi rate (~3.5%, unlikely).

### Risk 3 — Aging Infrastructure CapEx Surprise (MODERATE-HIGH)
Built 1981, the home is approaching the **45-year wall** where roofs (15-25 yr life), HVAC (15-20 yr), water heaters (10-15 yr), windows (20-30 yr), and electrical panels are all at or past end-of-life simultaneously. A single roof + HVAC replacement event = $25K-$40K. NJ winters add boiler/heating system risk. The 5% CapEx reserve ($2,040/yr) is **almost certainly understated** for a property of this age and would not fund a major event from cash flow.
*Mitigation:* Pre-purchase inspection focused on roof, HVAC, electrical service, plumbing; raise CapEx reserve to 8-10% of GSI; price-negotiate or escrow for known deferred items.

---

## 10. Recommendations

1. **Do not buy as a financed LTR investment.** The math is unrecoverable without a major rate cut and rent appreciation that outpace tax growth.
2. **If buying as a primary residence** that you might later convert to a rental, expect to subsidize $2,500-$3,500/mo if you ever leave it as a leveraged rental. Better to sell on departure.
3. **If pursuing as appreciation-only / wealth play**, plan all-cash or 50%+ down, accept negative or near-zero NOI, and underwrite to 4-6%/yr appreciation (Moorestown has historically outperformed the broader NJ market thanks to schools and proximity). 10-yr hold required to overcome 4% closing/transfer drag.
4. **If exploring rental**, model **medium-term furnished rental** (30-90 day) targeting Lockheed Martin Moorestown / Subaru HQ / Cooper Health corporate housing — could push to $5K+/mo gross, narrowing (but not closing) the cash gap.
5. **Negotiate purchase below $700K** to materially change underwriting. At $700K with $3,800 rent, cap rate moves to ~1.4%; still poor but closer to tolerable for an appreciation-focused investor.

---

## Sources

**Subject Property**
- [Redfin — 583 Sentinel Rd listing](https://www.redfin.com/NJ/Moorestown/583-Sentinel-Rd-08057/home/35999237) (403 to scrape; cached search result used for sqft/year built)
- [Zillow — 583 Sentinel Rd](https://www.zillow.com/homedetails/583-Sentinel-Rd-Moorestown-NJ-08057/38131031_zpid/) (403 to scrape)
- [Homes.com — 583 Sentinel Rd](https://www.homes.com/property/583-sentinel-rd-moorestown-nj/sgwrtk17hy47t/) — sold $779,900 ~Nov 2025; 5BR/3BA/2,817sqft

**Rental Comps & Market**
- [Apartments.com — Moorestown Houses for Rent](https://www.apartments.com/houses/moorestown-nj/)
- [Apartments.com — Moorestown 4BR Houses](https://www.apartments.com/houses/moorestown-nj/4-bedrooms/)
- [Zillow — Moorestown Township Rentals](https://www.zillow.com/moorestown-township-nj/rentals/)
- [Rent.com — Moorestown Houses](https://www.rent.com/new-jersey/moorestown-houses)
- [Zumper — Moorestown Rent Trends](https://www.zumper.com/rent-research/moorestown-nj)
- [RentCafe — Moorestown Average Rent](https://www.rentcafe.com/average-rent-market-trends/us/nj/moorestown/)

**Property Tax**
- [Ownwell — Moorestown Property Taxes](https://www.ownwell.com/trends/new-jersey/burlington-county/moorestown) — 2.75% median effective rate
- [Sun Papers — Moorestown Property Taxes Rise 2.4% in 2025](https://thesunpapers.com/2026/02/13/moorestown-property-taxes-rise-in-2025/) — 2.81% total 2025
- [Patch — Moorestown 2026 Budget](https://patch.com/new-jersey/moorestown/moorestown-approves-31-5m-budget-tax-hikes-2026-municipal-budget)
- [NJ Treasury — 2024 General Tax Rates PDF](https://www.nj.gov/treasury/taxation/pdf/lpt/gtr/2024taxrates.pdf)
- [Joe Shimkus — Burlington County Tax Rates](https://joeshimkus.com/NJ-Tax-Rates-Burlington-County.aspx)
- [Moorestown Township Tax Assessor](https://www.moorestown.nj.us/230/Tax-Assessor)

**Insurance**
- [MoneyGeek — NJ Home Insurance Cost](https://www.moneygeek.com/insurance/homeowners/average-cost-home-insurance-new-jersey/)
- [Insure.com — NJ Home Insurance Average](https://www.insure.com/home-insurance/average-cost-of-homeowners-insurance-in-new-jersey/)
- [Steadily — NJ Landlord Insurance](https://www.steadily.com/states/new-jersey)

**STR / Regulations**
- [Airbnb — Moorestown NJ Stays](https://www.airbnb.com/moorestown-nj/stays) — only 5 listings town-wide
- [Vrbo — Moorestown Vacation Rentals](https://www.vrbo.com/vacation-rentals/usa/new-jersey/moorestown)
- [Hospitable — Airbnb Statistics by City 2025](https://hospitable.com/airbnb-statistics-by-city)
- [Moorestown Landlord Registration](https://www.moorestown.nj.us/150/Landlord-Registration)
- [eCode360 — Moorestown Township Code](https://ecode360.com/MO1116)

---

## Disclaimer

This analysis is provided for educational and informational purposes only and does **not** constitute financial, tax, legal, or real estate investment advice. All figures are estimates derived from publicly available data sources as of May 2026. Actual rental income, expenses, taxes, and returns will vary based on lease terms, tenant quality, market conditions, individual property condition, financing terms actually obtained, and unforeseen events. Property tax estimates are based on Moorestown Township's published effective rate applied to last sale price; the actual assessed value and tax bill may differ. Subject property data was retrieved from cached search results because Zillow and Redfin pages returned HTTP 403 to direct fetch; **independent verification of bedrooms, baths, square footage, sale date, current condition, lot size, and tax bill via direct MLS, public records, or licensed agent is required** before any investment decision. Rental comparables were limited to publicly visible listings; full-MLS comp pull may yield different figures. Consult a licensed New Jersey real estate broker, CPA, real estate attorney, and qualified mortgage professional before transacting.
