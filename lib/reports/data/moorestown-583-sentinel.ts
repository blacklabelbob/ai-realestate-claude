import type { Report, RawPropertyData } from "../types";
import raw from "./moorestown-583-sentinel.raw.json";

export const moorestown583: Report = {
  slug: "583-sentinel-rd-moorestown-nj",
  shortAddress: "583 Sentinel Rd",
  city: "Moorestown",
  state: "NJ",
  audiences: ["Buyer", "Investor", "Agent"],
  grade: "B",
  signal: "HOLD / WATCH",
  headline:
    "Premium A+ school district, brutal leveraged-rental math. A buy for the owner-occupant family; a pass for the investor at retail.",
  strengths: [
    "Niche A+ school district, #16 in NJ — a permanent demand floor.",
    "$158,770 median HHI, 64% bachelor's+, only 1% post-2020 construction (essentially built-out).",
    "Same-street comps ($999K, $915K) support an $870K mid-FMV — last sale of $779,900 was a ~10% discount.",
  ],
  risks: [
    "NJ property tax is 2.81% effective — $21,915/yr today, $26K+ in 5 years.",
    "1981 build at the 45-year CapEx wall: $75–125K refresh likely (roof, HVAC, kitchen, baths).",
    "SALT cap reverts to $10K in 2030 → 3–7% home-price repricing risk.",
  ],
  pdfUrl: "/reports/583-sentinel-rd-moorestown.pdf",
  heroGradient: "from-navy via-[#2a3545] to-forest",
  isFlagship: true,
  verified: true,
  coords: { lat: 39.9863964, lng: -74.9317876 }, // geocoded via OSM Nominatim (583 Sentinel Rd, Moorestown NJ)
  categoryRationale: {
    "Value & Comps":
      "Same-street comps trade $254–$369/sqft; 2,817 sqft × ~$310 avg ≈ $873K FMV, so the $779,900 last sale sits ~10% under — a gap explained by original 1981 condition vs renovated comps.",
    "Income Potential":
      "At a moderate $3,800 rent the property bleeds −$3,233/mo: NJ's 2.81% effective tax alone is $21,915/yr, dragging the cap rate to ~1.0% and the 1% rule to 0.49%.",
    "Neighborhood Quality":
      "Niche A+ / #16-in-NJ schools, $158,770 median HHI, crime 56% below average, and a built-out supply (1% post-2020 construction) create a permanent demand floor.",
    "Investment Upside":
      "Appreciation is real (+3–6%/yr) but every leveraged play loses — BRRRR isn't viable (no distressed inventory) and a retail flip models a ~$135K loss.",
    "Market Conditions":
      "08057 runs +4–6.5% YoY vs county 0–2.9% on ~3.2 months of supply, anchored by Lockheed + A+ schools; the SALT $40K cap adds a 2026–2029 tailwind.",
  },
  market: {
    classification: "Seller's Market (Moderating)",
    whyItContinues:
      "08057 has structurally outperformed surrounding Burlington County (+4–6.5% YoY vs 0–2.9%) because the demand drivers are durable, not cyclical: a Niche A+ #16-in-NJ school district, the 4,500–5,200-job Lockheed Martin campus, a walkable downtown, and a built-out housing stock (only 1% post-2020 construction). The SALT cap raise to $40,400 adds a perishable 2026–2029 tailwind that pulls demand forward.",
    snapshot: [
      { label: "Median sale price (08057, Jan 2026)", value: "$650,000", source: "Redfin — 08057 ZIP", url: "https://www.redfin.com/zipcode/08057/housing-market" },
      { label: "Typical home value (Zillow ZHVI)", value: "$687,748", source: "Zillow — Moorestown Twp", url: "https://www.zillow.com/home-values/395758/moorestown-township-nj/" },
      { label: "Trailing 12-mo median sale price", value: "$741,250", source: "Homes.com", url: "https://www.homes.com/moorestown-nj/sold/" },
      { label: "YoY price change (08057)", value: "+4.0%", source: "Redfin (Jan 2026 YoY)", url: "https://www.redfin.com/zipcode/08057/housing-market" },
      { label: "YoY price change (Zillow ZHVI)", value: "+6.5%", source: "Zillow", url: "https://www.zillow.com/home-values/395758/moorestown-township-nj/" },
      { label: "Burlington County YoY", value: "0.0% to +2.9%", source: "Redfin / local brokers", url: "https://www.redfin.com/county/1893/NJ/Burlington-County/housing-market" },
      { label: "Moorestown active inventory", value: "~48 listings", source: "Movoto", url: "https://www.movoto.com/moorestown-nj/market-trends/" },
      { label: "NJ months of supply", value: "~3.2 months", source: "DeFalco Realty", url: "https://www.defalcorealty.com/blog/new-jersey-housing-market-report-march-2026/" },
      { label: "Burlington Co. days on market", value: "~38 days", source: "Mike Sells NJ (Mar 2026)", url: "https://mikesellsnj.com/burlington-county-real-estate-market-march-2026/" },
      { label: "30-yr fixed rate (NJ, May 2026)", value: "6.39–6.63%", source: "Bankrate / NerdWallet", url: "https://www.bankrate.com/mortgages/mortgage-rates/new-jersey/" },
    ],
    migration: [
      { label: "NJ net out-migration rank (2025)", value: "#7 nationally (-16,283)", source: "Tax Foundation — State Migration", url: "https://taxfoundation.org/data/all/state/state-migration-trends-map-americans-moving-population-changes/" },
      { label: "NJ net residents lost since 2020", value: "192,209", source: "Sunlight Policy Center NJ", url: "https://sunlightpolicynj.org/new-study-njs-downward-spiral-continues-with-522288-people-and-31-billion-in-income-leaving-for-other-states-over-the-past-decade/" },
      { label: "NJ AGI lost (2022–23)", value: "$2.55B", source: "Sunlight Policy Center NJ", url: "https://sunlightpolicynj.org/new-study-njs-downward-spiral-continues-with-522288-people-and-31-billion-in-income-leaving-for-other-states-over-the-past-decade/" },
      { label: "Outer-NYC / premium-suburb inflow", value: "2026 hot zone", source: "Reventure / Zillow forecast", url: "https://reventureapp.blog/zillow-just-flipped-their-2026-housing-market-forecast/" },
    ],
    drivers: [
      { title: "Lockheed Martin Moorestown", detail: "126-acre campus, 4,500–5,200 high-paying engineering jobs (Aegis radar / naval combat systems); +400 jobs added by 2023." },
      { title: "Moorestown schools", detail: "Niche A+, #16 best district in NJ, #1 in Burlington County; HS #39 statewide — the #1 reason families pay the premium." },
      { title: "Philly / Cherry Hill / Princeton corridor", detail: "I-295 / Rt 38 / NJ Turnpike crossroads — ~25 min to Center City, reaches the South Jersey pharma belt (BMS, J&J, Merck)." },
      { title: "SALT cap window (2026–2029)", detail: "Cap lifted $10K → $40,400, indexed +1%/yr through 2029 — restores 5-figure federal deductibility; reverts to $10K in 2030." },
    ],
    forecast:
      "Moorestown-specific: +3% to +6% appreciation over the next 12 months (Zillow NJ ZHVI +2–4%; Real Estate NJ up to +5.8% in select sub-markets). Inventory loosens modestly but not enough to flip 08057 to a buyer's market.",
    scoreBreakdown: [
      { factor: "Price momentum (08057 +4–6.5% YoY)", weight: "20%", score: 75, notes: "Healthy appreciation, not bubble territory" },
      { factor: "Inventory / leverage (3.2 MoS)", weight: "15%", score: 60, notes: "Still seller-leaning, hard for buyers" },
      { factor: "Days on market (38–55 days)", weight: "10%", score: 70, notes: "Normalizing; not overheated" },
      { factor: "Mortgage rate environment (~6.5%)", weight: "15%", score: 60, notes: "Better than 2023 peaks (~7.8%); still elevated" },
      { factor: "Local economic anchors", weight: "20%", score: 92, notes: "Lockheed + schools + commute — best-in-county" },
      { factor: "12-mo forecast", weight: "10%", score: 75, notes: "Modest positive growth expected" },
      { factor: "NJ tax / migration drag", weight: "10%", score: 50, notes: "Real headwind, partly offset by SALT window" },
    ],
    sources: [
      { label: "Redfin — 08057 Housing Market", url: "https://www.redfin.com/zipcode/08057/housing-market" },
      { label: "Zillow — Moorestown Township Home Values", url: "https://www.zillow.com/home-values/395758/moorestown-township-nj/" },
      { label: "Homes.com — Moorestown Recently Sold", url: "https://www.homes.com/moorestown-nj/sold/" },
      { label: "Redfin — Burlington County Market", url: "https://www.redfin.com/county/1893/NJ/Burlington-County/housing-market" },
      { label: "DeFalco Realty — NJ Housing Market Spring 2026", url: "https://www.defalcorealty.com/blog/new-jersey-housing-market-report-march-2026/" },
      { label: "FRED — Median Days on Market in NJ", url: "https://fred.stlouisfed.org/series/MEDDAYONMARNJ" },
      { label: "Tax Foundation — State Migration Trends", url: "https://taxfoundation.org/data/all/state/state-migration-trends-map-americans-moving-population-changes/" },
      { label: "Niche — Moorestown Township School District", url: "https://www.niche.com/k12/d/moorestown-township-public-school-district-nj/rankings/" },
      { label: "Lockheed Martin — Moorestown NJ", url: "https://www.lockheedmartin.com/en-us/careers/locations/moorestown-new-jersey.html" },
      { label: "NAR — SALT Deduction Cap Relief", url: "https://www.nar.realtor/magazine/real-estate-news/salt-deduction-cap-delivers-relief-to-homeowners" },
    ],
  },
  data: raw as RawPropertyData,
};
