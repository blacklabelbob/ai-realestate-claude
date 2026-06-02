// Canonical shape produced by the /realestate analyze 5-agent fan-out.
// Mirrors property-data-583-sentinel.json exactly, plus display metadata.

export type Audience = "Buyer" | "Seller" | "Investor" | "Agent";

export type Signal = "BUY" | "STRONG BUY" | "HOLD / WATCH" | "HOLD / VERIFY" | "CAUTION" | "PASS" | "AVOID";

export interface CategoryScore {
  score: number;
  weight: string;
}

export interface Comp {
  address: string;
  price: string;
  sqft: string;
  price_sqft: string;
  sold_date: string;
  distance: string;
}

export interface CashflowItem {
  item: string;
  monthly: string;
  annual: string;
}

export interface InvestmentMetrics {
  cap_rate: string;
  cap_rate_status: string;
  cash_on_cash: string;
  coc_status: string;
  grm: string;
  grm_status: string;
  dscr: string;
  dscr_status: string;
  one_pct: string;
  one_pct_status: string;
  breakeven: string;
  breakeven_status: string;
}

export interface NeighborhoodDetail {
  factor: string;
  detail: string;
  notes: string;
}

export interface Strategy {
  strategy: string;
  projected_return: string;
  timeframe: string;
  pros: string;
  risk: string;
}

export interface AppreciationRow {
  year: string;
  conservative: string;
  moderate: string;
  aggressive: string;
}

export interface Scenario {
  scenario: string;
  probability: string;
  return: string;
  trigger: string;
}

export interface RiskFactor {
  factor: string;
  probability: string;
  impact: string;
  notes: string;
}

export interface RawPropertyData {
  address: string;
  price: string;
  date: string;
  overall_score: number;
  property_details: {
    beds: string;
    baths: string;
    sqft: string;
    year_built: string;
    lot_size: string;
    property_type: string;
  };
  categories: Record<string, CategoryScore>;
  comps: Comp[];
  comp_summary: { avg_price: string; avg_price_sqft: string };
  cashflow: { items: CashflowItem[] };
  investment_metrics: InvestmentMetrics;
  mortgage: Record<string, string>;
  neighborhood: {
    scores: Record<string, number>;
    details: NeighborhoodDetail[];
    demographics: Record<string, string>;
  };
  strategies: Strategy[];
  appreciation_projections: AppreciationRow[];
  scenarios: Scenario[];
  recommendation: {
    signal: string;
    summary: string;
    suggested_offer: string;
    action_items: string[];
  };
  risk_factors: RiskFactor[];
}

// A single number a client could challenge — always carries where it came from.
export interface SourcedMetric {
  label: string;
  value: string;
  source: string;
  url: string;
}

export interface MarketScoreRow {
  factor: string;
  weight: string;
  score: number;
  notes: string;
}

// The "show me the trailing data and let me verify your math" layer (Rob, round 3).
export interface MarketEvidence {
  classification: string; // e.g. "Seller's Market (Moderating)"
  whyItContinues: string; // the thesis behind a directional call
  snapshot: SourcedMetric[]; // median, trailing 12-mo, YoY, inventory, MoS, DOM, rate
  migration: SourcedMetric[]; // net migration / inflow figures
  drivers: { title: string; detail: string }[];
  forecast: string;
  scoreBreakdown: MarketScoreRow[];
  sources: { label: string; url: string }[];
}

// Display metadata layered on top of the raw analysis.
export interface ReportMeta {
  slug: string;
  shortAddress: string;
  city: string;
  state: string;
  audiences: Audience[];
  grade: string; // A+, A, B, C, D, F
  signal: Signal;
  headline: string; // one-line verdict
  strengths: string[];
  risks: string[];
  pdfUrl: string;
  heroGradient: string; // tailwind gradient classes
  isFlagship?: boolean;
  verified?: boolean; // true = real MLS-backed; false = illustrative sample
  market?: MarketEvidence; // sourced trailing data behind the Market score
  // one-line justification per category, keyed by the category name in data.categories
  categoryRationale?: Record<string, string>;
  // pre-geocoded so the satellite renders instantly with no per-visitor geocoding call
  coords?: { lat: number; lng: number };
}

export interface Report extends ReportMeta {
  data: RawPropertyData;
}

// Grade band per realestate/SKILL.md scoring methodology.
export function gradeForScore(score: number): { grade: string; band: string } {
  if (score >= 85) return { grade: "A+", band: "Strong Buy" };
  if (score >= 70) return { grade: "A", band: "Buy" };
  if (score >= 55) return { grade: "B", band: "Hold / Watch" };
  if (score >= 40) return { grade: "C", band: "Caution" };
  if (score >= 25) return { grade: "D", band: "Pass" };
  return { grade: "F", band: "Avoid" };
}

// Numeric value pulled from a "$1,234" / "-$1,234" / "1.77%" string for charts.
export function parseMoney(value: string): number {
  const cleaned = value.replace(/[^0-9.-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}
