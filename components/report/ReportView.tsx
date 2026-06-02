import {
  Download,
  MapPin,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  CheckCircle2,
  BadgeCheck,
  FlaskConical,
  Scale,
  Database,
  ShieldCheck,
  Lock,
  Home,
  Bed,
  Bath,
  Ruler,
  CalendarClock,
  Trees,
  Building,
  ArrowDownRight,
  Target,
  Compass,
} from "lucide-react";
import type { Report } from "@/lib/reports";
import { gradeForScore, parseMoney } from "@/lib/reports";
import { ScoreGauge } from "@/components/report/ScoreGauge";
import { PropertySatellite } from "@/components/report/PropertySatellite";
import { CompsMap } from "@/components/report/CompsMap";
import { MarketEvidence } from "@/components/report/MarketEvidence";
import {
  CashflowWaterfall,
  AppreciationChart,
  CategoryRadial,
  NeighborhoodBars,
} from "@/components/report/ReportCharts";
import { EmailGate } from "@/components/EmailGate";

function SectionTitle({
  kicker,
  title,
  icon: Icon,
}: {
  kicker: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-6">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {kicker}
      </p>
      <h2 className="mt-1.5 font-display text-2xl font-semibold leading-tight text-navy sm:text-[1.85rem]">
        {title}
      </h2>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-12 flex items-center gap-4" aria-hidden>
      <span className="h-px flex-1 bg-navy/10" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
      <span className="h-px flex-1 bg-navy/10" />
    </div>
  );
}

function Bar({ label, value, weight }: { label: string; value: number; weight?: string }) {
  const color = value >= 70 ? "bg-forest" : value >= 40 ? "bg-gold" : "bg-red-500";
  return (
    <div className="flex items-center gap-3">
      <span className="w-44 shrink-0 text-sm font-medium text-navy/70">
        {label}
        {weight && <span className="ml-1 text-xs font-normal text-navy/40">({weight})</span>}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-navy/[0.07]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="w-10 text-right font-mono text-sm font-semibold text-navy">{value}</span>
    </div>
  );
}

function isNegative(s: string) {
  return s.trim().startsWith("-");
}

const DETAIL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Beds: Bed,
  Baths: Bath,
  "Sq Ft": Ruler,
  Built: CalendarClock,
  Lot: Trees,
  Type: Building,
};

export function ReportView({ report }: { report: Report }) {
  const d = report.data;
  const { band } = gradeForScore(d.overall_score);
  const netCashflow = d.cashflow.items[d.cashflow.items.length - 1];
  const netIsNeg = parseMoney(netCashflow?.monthly ?? "0") < 0;

  // Executive-summary headline metrics (all from existing data — nothing invented)
  const topCat = Object.entries(d.categories).sort((a, b) => b[1].score - a[1].score)[0];
  const lowCat = Object.entries(d.categories).sort((a, b) => a[1].score - b[1].score)[0];
  const summaryStats = [
    { label: "List / Last Sale", value: d.price.split(" ")[0], sub: "asking", icon: Home },
    { label: "Cap Rate", value: d.investment_metrics.cap_rate, sub: "gross yield", icon: Target },
    {
      label: "Net Cash Flow",
      value: `${netCashflow?.monthly}/mo`,
      sub: netCashflow?.annual + "/yr",
      icon: ArrowDownRight,
      neg: netIsNeg,
    },
    { label: "Strongest", value: `${topCat[1].score}`, sub: topCat[0], icon: TrendingUp },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 text-navy sm:px-6 lg:px-8">
      {/* Print / white-label brand header (logo slot — hidden on screen, shown on print) */}
      <div className="print-brand mb-6 items-center justify-between border-b border-navy/15 pb-3">
        <span className="text-sm font-bold text-navy">AI Real Estate Analyst</span>
        <span className="text-xs text-navy/50">Property Intelligence Report · {d.date}</span>
      </div>

      {/* ===================== COVER ===================== */}
      <header
        className={`report-cover overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${report.heroGradient} p-7 text-cream shadow-2xl ring-1 ring-white/10 sm:p-10`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-display text-sm font-semibold tracking-wide text-cream/80">
            Property Intelligence Report
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {report.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-forest/30 px-3 py-1 text-xs font-medium text-cream ring-1 ring-inset ring-forest/40">
                <BadgeCheck className="h-3.5 w-3.5" /> MLS-backed analysis
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/25 px-3 py-1 text-xs font-medium text-cream ring-1 ring-inset ring-gold/40">
                <FlaskConical className="h-3.5 w-3.5" /> Illustrative sample
              </span>
            )}
            <span className="rounded-full bg-cream/10 px-3 py-1 text-xs text-cream/80">{d.date}</span>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm text-cream/65">
              <MapPin className="h-4 w-4 text-gold" /> {d.address}
            </p>
            <h1 className="mt-2.5 font-display text-[2.1rem] font-semibold leading-[1.05] sm:text-[2.9rem]">
              {report.shortAddress}
              <span className="block text-cream/75">
                {report.city}, {report.state}
              </span>
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <span className="rounded-lg bg-gold px-3.5 py-1.5 text-sm font-bold text-navy shadow-sm">
                {report.signal}
              </span>
              <span className="rounded-lg bg-cream/10 px-3 py-1.5 text-sm text-cream/80 ring-1 ring-inset ring-cream/15">
                {band}
              </span>
              <span className="rounded-lg bg-cream/10 px-3 py-1.5 text-sm font-medium text-cream/90 ring-1 ring-inset ring-cream/15">
                {d.price.split(" ")[0]}
              </span>
            </div>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/85">
              {report.headline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={report.pdfUrl}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy shadow-lg shadow-gold/20 transition hover:brightness-110"
              >
                <Download className="h-4 w-4" /> Download branded PDF
              </a>
            </div>
          </div>
          <div className="flex justify-center sm:justify-end">
            <ScoreGauge score={d.overall_score} grade={report.grade} size={196} variant="dark" />
          </div>
        </div>

        {/* property details */}
        <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-cream/10 ring-1 ring-inset ring-cream/10 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries({
            Beds: d.property_details.beds,
            Baths: d.property_details.baths,
            "Sq Ft": d.property_details.sqft,
            Built: d.property_details.year_built,
            Lot: d.property_details.lot_size,
            Type: d.property_details.property_type,
          }).map(([k, v]) => {
            const Icon = DETAIL_ICONS[k] ?? Home;
            return (
              <div key={k} className="bg-navy/35 p-3.5">
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-cream/45">
                  <Icon className="h-3 w-3 text-gold/80" /> {k}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-cream">{v}</p>
              </div>
            );
          })}
        </div>
      </header>

      {/* ===================== EXECUTIVE SUMMARY BAND ===================== */}
      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="report-card rounded-3xl p-6 sm:p-7">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <Compass className="h-3.5 w-3.5" /> Executive Summary
          </p>
          <p className="mt-3 font-display text-lg leading-relaxed text-navy/90">
            {d.recommendation.summary.split(". ").slice(0, 2).join(". ")}.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {summaryStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-navy/[0.07] bg-cream/40 p-3">
                  <Icon className={`h-4 w-4 ${s.neg ? "text-red-500" : "text-forest"}`} />
                  <p className="mt-2 font-mono text-base font-bold leading-none text-navy">{s.value}</p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-navy/45">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-navy/55">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-forest" /> Strongest: {topCat[0]} ({topCat[1].score})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-red-500" /> Weakest: {lowCat[0]} ({lowCat[1].score})
            </span>
          </div>
        </div>

        {/* Aerial preview — compact, deliberate */}
        <PropertySatellite
          address={d.address}
          coords={report.coords}
          verified={report.verified}
          caption={`Aerial view — ${report.shortAddress}`}
          className="rounded-3xl"
        />
      </section>

      <Divider />

      {/* ===================== SCORE BREAKDOWN ===================== */}
      <section>
        <SectionTitle kicker="The 5-Agent Score" title={`How the ${d.overall_score} breaks down`} icon={Scale} />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="report-card space-y-4 rounded-2xl p-6">
            {Object.entries(d.categories).map(([label, c]) => (
              <div key={label}>
                <Bar label={label} value={c.score} weight={c.weight} />
                {report.categoryRationale?.[label] && (
                  <p className="mt-1.5 pl-0 text-xs leading-snug text-navy/50 sm:pl-44">
                    {report.categoryRationale[label]}
                  </p>
                )}
              </div>
            ))}
            <p className="border-t border-navy/[0.07] pt-3 text-sm text-navy/55">
              Composite = weighted average across Value &amp; Comps, Income, Neighborhood, Investment Upside, and Market.
            </p>
          </div>
          <div className="report-card hidden rounded-2xl p-5 lg:block lg:w-[260px]">
            <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wide text-navy/45">
              Score at a glance
            </p>
            <CategoryRadial categories={d.categories} />
          </div>
        </div>
      </section>

      <Divider />

      {/* ===================== METHODOLOGY & CONFIDENCE ===================== */}
      <section>
        <SectionTitle kicker="Why You Can Trust This" title="How we reached this score" icon={ShieldCheck} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: Scale,
              color: "text-gold",
              title: "Weighted, not averaged",
              body: "Five specialist agents score independently, then combine on a fixed weighting — Value & Comps 25%, Income 20%, Neighborhood 20%, Investment Upside 20%, Market 15%. Price anchors the most weight because it is the one number you can least afford to get wrong.",
            },
            {
              icon: Database,
              color: "text-forest",
              title: "Evidence on the page",
              body: "Every category is driven by the specific comps, real expense lines, and named local data points shown in this report — recent sales, tax rates, school ratings, market inventory. Nothing here is a black-box guess; you can audit the inputs yourself.",
            },
            {
              icon: ShieldCheck,
              color: "text-navy",
              title: "Conservative by design",
              body: "Rental income and appreciation use conservative assumptions, and we publish the bear case explicitly. We would rather flag a deal you should walk from than talk you into one.",
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="report-card rounded-2xl p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/[0.04]">
                  <Icon className={`h-5 w-5 ${c.color}`} />
                </div>
                <h4 className="mt-3 font-semibold text-navy">{c.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-navy/60">{c.body}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-navy/[0.04] p-4 text-xs text-navy/50">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-navy/40" />
          <span>
            <strong className="text-navy/70">What stays under the hood:</strong> the exact normalization
            curves, agent prompts, and scoring model are proprietary. What you see here is the full
            reasoning and evidence behind the call — the logic, not the engine.
          </span>
        </p>
      </section>

      <Divider />

      {/* ===================== STRENGTHS & RISKS ===================== */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-forest/20 bg-forest/[0.06] p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-forest">
            <TrendingUp className="h-5 w-5" /> Top Strengths
          </h3>
          <ul className="mt-4 space-y-3">
            {report.strengths.map((s) => (
              <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-navy/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-red-600">
            <TrendingDown className="h-5 w-5" /> Top Risks
          </h3>
          <ul className="mt-4 space-y-3">
            {report.risks.map((s) => (
              <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-navy/80">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Divider />

      {/* ===================== COMPS ===================== */}
      <section>
        <SectionTitle kicker="Value & Comps" title="Comparable sales" icon={Home} />
        <div className="mb-5">
          <CompsMap
            subjectAddress={d.address}
            subjectLabel={report.shortAddress}
            comps={d.comps}
            city={report.city}
            state={report.state}
            verified={report.verified}
          />
        </div>
        <div className="report-card overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy/10 bg-navy/[0.03] text-left text-xs uppercase tracking-wide text-navy/55">
                  <th className="px-4 py-3 font-semibold">Address</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Sq Ft</th>
                  <th className="px-4 py-3 font-semibold">$/Sq Ft</th>
                  <th className="px-4 py-3 font-semibold">Sold</th>
                  <th className="px-4 py-3 font-semibold">Dist.</th>
                </tr>
              </thead>
              <tbody>
                {d.comps.map((c, i) => (
                  <tr key={c.address} className={`border-b border-navy/5 last:border-0 ${i % 2 ? "bg-navy/[0.015]" : ""}`}>
                    <td className="px-4 py-3 font-medium text-navy">{c.address}</td>
                    <td className="px-4 py-3 font-mono text-navy">{c.price}</td>
                    <td className="px-4 py-3 text-navy/70">{c.sqft}</td>
                    <td className="px-4 py-3 font-mono text-navy/70">{c.price_sqft}</td>
                    <td className="px-4 py-3 text-navy/60">{c.sold_date}</td>
                    <td className="px-4 py-3 text-navy/60">{c.distance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-6 border-t border-navy/[0.07] bg-cream/30 px-4 py-3 text-sm text-navy/70">
            <span>
              Avg price: <strong className="text-navy">{d.comp_summary.avg_price}</strong>
            </span>
            <span>
              Avg $/sqft: <strong className="text-navy">{d.comp_summary.avg_price_sqft}</strong>
            </span>
          </div>
        </div>
      </section>

      <Divider />

      {/* ===================== NEIGHBORHOOD ===================== */}
      <section>
        <SectionTitle kicker="Neighborhood Quality" title="Location intelligence" icon={MapPin} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="report-card rounded-2xl p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy/45">Sub-scores</p>
            <NeighborhoodBars scores={d.neighborhood.scores} />
          </div>
          <div className="report-card rounded-2xl p-6">
            <dl className="space-y-3.5">
              {d.neighborhood.details.slice(0, 6).map((row) => (
                <div key={row.factor} className="border-b border-navy/[0.06] pb-3 last:border-0 last:pb-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-navy/45">{row.factor}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-navy">{row.detail}</dd>
                  <dd className="text-xs text-navy/50">{row.notes}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ===================== MARKET EVIDENCE (free) ===================== */}
      {report.market && (
        <>
          <Divider />
          <MarketEvidence market={report.market} marketScore={d.categories["Market Conditions"]?.score} />
        </>
      )}

      <Divider />

      {/* ===================== GATED: the money sections ===================== */}
      <section>
        <EmailGate
          source={`report:${report.slug}`}
          address={d.address}
          reportSlug={report.slug}
          title="See the cash flow, ROI scenarios & the verdict"
          subtitle="The deal math is where the decision lives. Drop your email to unlock the full financial model, investment strategies, and recommendation — instantly, right here."
          previewHeight="30rem"
        >
          <div className="space-y-12">
            {/* CASH FLOW — table + waterfall chart */}
            <div>
              <SectionTitle kicker="Income Potential" title="Rental cash-flow model" icon={ArrowDownRight} />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="report-card overflow-hidden rounded-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-navy/10 bg-navy/[0.03] text-left text-xs uppercase tracking-wide text-navy/55">
                          <th className="px-4 py-3 font-semibold">Line item</th>
                          <th className="px-4 py-3 text-right font-semibold">Monthly</th>
                          <th className="px-4 py-3 text-right font-semibold">Annual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.cashflow.items.map((row, i) => {
                          const isTotal = i === d.cashflow.items.length - 1;
                          return (
                            <tr
                              key={row.item}
                              className={`border-b border-navy/5 last:border-0 ${isTotal ? "bg-navy/[0.04] font-semibold" : ""}`}
                            >
                              <td className="px-4 py-2.5 text-navy">{row.item}</td>
                              <td className={`px-4 py-2.5 text-right font-mono ${isNegative(row.monthly) ? "text-red-600" : "text-navy"}`}>
                                {row.monthly}
                              </td>
                              <td className={`px-4 py-2.5 text-right font-mono ${isNegative(row.annual) ? "text-red-600" : "text-navy"}`}>
                                {row.annual}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="report-card rounded-2xl p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-navy/45">
                    Where the money goes (monthly)
                  </p>
                  <CashflowWaterfall items={d.cashflow.items} />
                </div>
              </div>
              <div
                className={`mt-4 flex items-center gap-2 rounded-xl p-3.5 text-sm ${netIsNeg ? "bg-red-500/10 text-red-700" : "bg-forest/10 text-forest"}`}
              >
                {netIsNeg ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                Net monthly cash flow: <strong>{netCashflow?.monthly}</strong> ({netCashflow?.annual}/yr)
              </div>
            </div>

            {/* INVESTMENT METRICS */}
            <div>
              <SectionTitle kicker="Investment Upside" title="Key investment metrics" icon={Target} />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "Cap Rate", v: d.investment_metrics.cap_rate, s: d.investment_metrics.cap_rate_status },
                  { label: "Cash-on-Cash", v: d.investment_metrics.cash_on_cash, s: d.investment_metrics.coc_status },
                  { label: "GRM", v: d.investment_metrics.grm, s: d.investment_metrics.grm_status },
                  { label: "DSCR", v: d.investment_metrics.dscr, s: d.investment_metrics.dscr_status },
                  { label: "1% Rule", v: d.investment_metrics.one_pct, s: d.investment_metrics.one_pct_status },
                  { label: "Break-even", v: d.investment_metrics.breakeven, s: d.investment_metrics.breakeven_status },
                ].map((m) => {
                  const neg = m.v.trim().startsWith("-");
                  return (
                    <div key={m.label} className="report-card rounded-xl p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-navy/45">{m.label}</p>
                      <p className={`mt-1 font-mono text-xl font-bold ${neg ? "text-red-600" : "text-navy"}`}>{m.v}</p>
                      <p className="mt-1.5 text-xs leading-snug text-navy/50">{m.s}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STRATEGIES */}
            <div>
              <SectionTitle kicker="Strategy" title="Which play actually works" icon={Compass} />
              <div className="space-y-4">
                {d.strategies.map((s) => (
                  <div key={s.strategy} className="report-card rounded-2xl p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-lg font-semibold text-navy">{s.strategy}</h4>
                      <span className="rounded-md bg-navy/[0.05] px-2.5 py-1 font-mono text-sm font-semibold text-navy">
                        {s.projected_return}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-navy/50">Timeframe: {s.timeframe}</p>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <p className="rounded-lg bg-forest/[0.07] p-2.5 text-sm text-navy/75">
                        <strong className="text-forest">Pros:</strong> {s.pros}
                      </p>
                      <p className="rounded-lg bg-red-500/[0.06] p-2.5 text-sm text-navy/75">
                        <strong className="text-red-600">Risk:</strong> {s.risk}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* APPRECIATION (chart) + SCENARIOS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <SectionTitle kicker="Projection" title="Appreciation outlook" icon={TrendingUp} />
                <div className="report-card rounded-2xl p-5">
                  <div className="mb-3 flex flex-wrap gap-4 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-navy/60">
                      <span className="h-2 w-3 rounded-sm" style={{ background: "hsl(143 52% 42%)" }} /> Aggressive
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-navy/60">
                      <span className="h-2 w-3 rounded-sm" style={{ background: "hsl(42 70% 50%)" }} /> Moderate
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-navy/60">
                      <span className="h-2 w-3 rounded-sm border-b-2 border-dashed border-navy/60" /> Conservative
                    </span>
                  </div>
                  <AppreciationChart rows={d.appreciation_projections} />
                </div>
              </div>
              <div>
                <SectionTitle kicker="Outlook" title="Bull / Base / Bear" icon={Scale} />
                <div className="space-y-3">
                  {d.scenarios.map((s) => (
                    <div key={s.scenario} className="report-card rounded-xl p-4">
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-semibold text-navy">{s.scenario}</h4>
                        <span className="rounded-full bg-navy/[0.05] px-2 py-0.5 text-xs text-navy/55">
                          {s.probability}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-sm font-semibold text-navy">{s.return}</p>
                      <p className="mt-1 text-xs leading-snug text-navy/50">{s.trigger}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RECOMMENDATION */}
            <div className="overflow-hidden rounded-3xl border-2 border-gold/40 bg-gradient-to-br from-gold/[0.08] to-gold/[0.02] p-6 sm:p-7">
              <SectionTitle kicker="The Verdict" title={`Signal: ${d.recommendation.signal}`} icon={Target} />
              <p className="text-sm leading-relaxed text-navy/80">{d.recommendation.summary}</p>
              <p className="mt-4 rounded-xl border border-gold/20 bg-white p-3.5 text-sm text-navy shadow-sm">
                <strong>Suggested offer:</strong> {d.recommendation.suggested_offer}
              </p>
              <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-navy/55">Next actions</h4>
              <ol className="mt-3 space-y-2.5">
                {d.recommendation.action_items.map((a, i) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-navy/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 font-mono text-xs font-bold text-navy">
                      {i + 1}
                    </span>
                    {a}
                  </li>
                ))}
              </ol>
            </div>

            {/* RISK FACTORS */}
            <div>
              <SectionTitle kicker="Due Diligence" title="Risk factors" icon={ShieldAlert} />
              <div className="report-card overflow-hidden rounded-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-navy/10 bg-navy/[0.03] text-left text-xs uppercase tracking-wide text-navy/55">
                        <th className="px-4 py-3 font-semibold">Factor</th>
                        <th className="px-4 py-3 font-semibold">Prob.</th>
                        <th className="px-4 py-3 font-semibold">Impact</th>
                        <th className="px-4 py-3 font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.risk_factors.map((r, i) => (
                        <tr key={r.factor} className={`border-b border-navy/5 align-top last:border-0 ${i % 2 ? "bg-navy/[0.015]" : ""}`}>
                          <td className="px-4 py-3 font-medium text-navy">{r.factor}</td>
                          <td className="px-4 py-3 text-navy/70">{r.probability}</td>
                          <td className="px-4 py-3 text-navy/70">{r.impact}</td>
                          <td className="px-4 py-3 text-xs text-navy/60">{r.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </EmailGate>
      </section>

      {/* ===================== DISCLAIMER ===================== */}
      <footer className="mt-12 rounded-xl border border-navy/10 bg-navy/[0.04] p-5 text-xs leading-relaxed text-navy/50">
        <strong className="text-navy/70">Disclaimer.</strong> This is AI-generated research for educational
        purposes only — not investment, financial, legal, or tax advice. Property values, rental estimates, tax
        projections, and market forecasts are approximations based on publicly available data and may contain
        errors. Always conduct independent due diligence and consult licensed real estate professionals (agent,
        appraiser, inspector, CPA, attorney) before any purchase or investment decision.
      </footer>
    </article>
  );
}
