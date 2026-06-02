import type { Report, RawPropertyData } from "../types";
import raw from "./austin-123-main.raw.json";

export const austin123: Report = {
  slug: "downtown-austin-condo-78701",
  shortAddress: "Downtown Condo",
  city: "Austin",
  state: "TX",
  audiences: ["Buyer", "Investor"],
  grade: "C",
  signal: "HOLD / VERIFY",
  headline:
    "Walker's-paradise downtown condo with elite fundamentals — but HOA + taxes + 7% rates bleed every leveraged scenario. An appreciation play, not a cash-flow play.",
  strengths: [
    "Walk Score 92 — the most walkable ZIP in Austin, with $162K median income.",
    "Google, Oracle (HQ), Meta, Indeed (HQ) employer base inside the downtown core.",
    "Deep buyer's market (127-day DOM, ~8.7-month supply) — real room to negotiate 15–20% under list.",
  ],
  risks: [
    "Every long-term-rental scenario bleeds ~$3,200–$3,800/month (HOA + 2.07% tax + 7% rate).",
    "Downtown condo oversupply: 12% housing-stock surge, condos down ~6.5% YoY broadly.",
    "STR upside largely gone post-July-2026 platform enforcement and HOA bans.",
  ],
  pdfUrl: "/reports/sample-report.pdf",
  heroGradient: "from-[#4a6fa5] via-navy to-forest",
  verified: false,
  coords: { lat: 30.2672, lng: -97.7431 }, // approx downtown Austin 78701 (illustrative — address not verified)
  categoryRationale: {
    "Value & Comps":
      "Downtown 78701 condos trade $384–$977/sqft; the modal sub-$1M 1BR supports a ~$650K mid-FMV, but wide dispersion across towers makes pricing strictly unit-specific.",
    "Income Potential":
      "A $2,950 1BR rent can't cover HOA + 2.07% tax + 7% debt — net −$3,549/mo, cap rate near 0%, with a break-even rent around $6,499.",
    "Neighborhood Quality":
      "Walk Score 92 (most walkable ZIP in Austin), $162K median income, and a Google/Oracle/Meta employer core — offset by no in-ZIP elementary school.",
    "Investment Upside":
      "No forced-appreciation lever (the HOA controls the exterior) plus an oversupplied condo market make BRRRR/flip unviable; it's a 7–10 year appreciation hold at best.",
    "Market Conditions":
      "A deep buyer's market — ~8.7 months supply, 127-day DOM, broader condos −6.5% YoY — partly offset by +65K/yr metro migration and elite downtown fundamentals.",
  },
  market: {
    classification: "Buyer's Market (Downtown Condos)",
    whyItContinues:
      "Downtown Austin's long-term demand engine (Google Block 185, Oracle HQ, Meta, Indeed HQ, +65K metro residents/yr) is intact, but a 12% surge in city housing stock has pushed the 78701 condo segment into a deep buyer's market — ~8.7-month supply, 127-day days-on-market, condos selling 4–4.3% under list. That spells negotiating room now, with a recovery thesis priced over a 7–10 year hold.",
    snapshot: [
      { label: "ZIP median sold (TTM)", value: "$746,956", source: "Redfin — 78701", url: "https://www.redfin.com/zipcode/78701/housing-market" },
      { label: "Downtown YoY (78701)", value: "+1.5%", source: "Redfin — 78701", url: "https://www.redfin.com/zipcode/78701/housing-market" },
      { label: "Broader Austin condo YoY", value: "-6.5%", source: "Redfin — Austin condos", url: "https://www.redfin.com/city/30818/TX/Austin/housing-market" },
      { label: "Months of supply (downtown condos)", value: "~8.7 months", source: "Redfin — Austin", url: "https://www.redfin.com/city/30818/TX/Austin/housing-market" },
      { label: "Days on market", value: "~127 days", source: "Redfin — Austin", url: "https://www.redfin.com/city/30818/TX/Austin/housing-market" },
      { label: "Median home value (78701)", value: "$722,400", source: "Zillow — Austin", url: "https://www.zillow.com/home-values/10221/austin-tx/" },
    ],
    migration: [
      { label: "Austin metro net migration", value: "+65,000 residents/yr", source: "U.S. Census / Austin Chamber", url: "https://www.austinchamber.com/economic-development/austin-profile/population" },
      { label: "City housing-stock growth (2023–24)", value: "+12%", source: "Redfin — Austin", url: "https://www.redfin.com/city/30818/TX/Austin/housing-market" },
    ],
    drivers: [
      { title: "Tech employer core", detail: "Google (Block 185), Oracle HQ, Meta, TikTok, Cloudflare, PayPal, Indeed HQ within the downtown grid." },
      { title: "Walkability", detail: "Walk Score 92 — the most walkable ZIP in Austin; strong long-term rental demand (+11% YoY 1BR rent)." },
      { title: "Oversupply overhang", detail: "New tower pipeline (The Modern, The Linden) plus 12% stock growth = near-term price pressure on condos." },
      { title: "STR clampdown", detail: "July 1, 2026 platform enforcement + HOA <30-night bans remove most short-term-rental upside." },
    ],
    forecast:
      "Flat-to-negative through 2026, recovery 2027+ at 2–4%, returning to 3–5% by 2028–2030. Treat as an appreciation play with deep reserves and a 7–10 year hold; cash-flow buyers should offer 15–20% under list.",
    scoreBreakdown: [
      { factor: "Price momentum (downtown +1.5%, broader -6.5%)", weight: "20%", score: 45, notes: "Downtown holding; broader condo segment falling" },
      { factor: "Inventory / leverage (8.7 MoS)", weight: "15%", score: 35, notes: "Deep buyer's market — oversupply" },
      { factor: "Days on market (~127 days)", weight: "10%", score: 40, notes: "Slow absorption; long carry risk" },
      { factor: "Mortgage rate environment (~7%)", weight: "15%", score: 55, notes: "Elevated; refi optionality if rates fall" },
      { factor: "Local economic anchors", weight: "20%", score: 80, notes: "Top-tier tech employer base downtown" },
      { factor: "12-mo forecast", weight: "10%", score: 45, notes: "Flat-to-negative near term" },
      { factor: "STR / regulatory drag", weight: "10%", score: 40, notes: "STR upside largely removed in 2026" },
    ],
    sources: [
      { label: "Redfin — 78701 Housing Market", url: "https://www.redfin.com/zipcode/78701/housing-market" },
      { label: "Redfin — Austin Housing Market", url: "https://www.redfin.com/city/30818/TX/Austin/housing-market" },
      { label: "Zillow — Austin TX Home Values", url: "https://www.zillow.com/home-values/10221/austin-tx/" },
      { label: "Austin Chamber — Population & Migration", url: "https://www.austinchamber.com/economic-development/austin-profile/population" },
    ],
  },
  data: raw as RawPropertyData,
};
