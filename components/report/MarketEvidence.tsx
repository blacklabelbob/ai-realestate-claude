import { ExternalLink, TrendingUp, Users, Building2 } from "lucide-react";
import type { MarketEvidence as MarketEvidenceType } from "@/lib/reports";

function SourceLink({ source, url }: { source: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-navy/50 underline decoration-dotted transition hover:text-navy"
    >
      {source} <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export function MarketEvidence({ market, marketScore }: { market: MarketEvidenceType; marketScore?: number }) {
  return (
    <section className="mt-12">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Market Conditions — Show Your Work</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-navy">
          The trailing data behind the call
          {typeof marketScore === "number" && (
            <span className="ml-2 align-middle text-base font-semibold text-navy/40">score {marketScore}/100</span>
          )}
        </h2>
      </div>

      {/* Classification + thesis */}
      <div className="rounded-2xl border-l-4 border-gold bg-gold/5 p-5">
        <span className="rounded-md bg-navy px-2.5 py-1 text-xs font-semibold text-cream">{market.classification}</span>
        <p className="mt-3 flex gap-2 text-sm leading-relaxed text-navy/80">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span>
            <strong className="text-navy">Why we expect it to continue:</strong> {market.whyItContinues}
          </span>
        </p>
      </div>

      {/* Snapshot table with per-row sources */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10 bg-navy/5 text-left text-navy/60">
              <th className="px-4 py-3 font-medium">Metric</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Source</th>
            </tr>
          </thead>
          <tbody>
            {market.snapshot.map((m) => (
              <tr key={m.label} className="border-b border-navy/5 last:border-0">
                <td className="px-4 py-2.5 text-navy/70">{m.label}</td>
                <td className="px-4 py-2.5 font-mono font-semibold text-navy">{m.value}</td>
                <td className="px-4 py-2.5"><SourceLink source={m.source} url={m.url} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Net migration / inflow */}
      <div className="mt-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy/60">
          <Users className="h-4 w-4" /> Net migration &amp; inflow
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {market.migration.map((m) => (
            <div key={m.label} className="rounded-xl border border-navy/10 bg-white p-4">
              <p className="font-mono text-lg font-bold text-navy">{m.value}</p>
              <p className="mt-1 text-xs text-navy/60">{m.label}</p>
              <div className="mt-1.5"><SourceLink source={m.source} url={m.url} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Drivers */}
      <div className="mt-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy/60">
          <Building2 className="h-4 w-4" /> Demand drivers
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {market.drivers.map((d) => (
            <div key={d.title} className="rounded-xl border border-navy/10 bg-white p-4">
              <p className="font-semibold text-navy">{d.title}</p>
              <p className="mt-1 text-sm text-navy/60">{d.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast */}
      <p className="mt-6 rounded-xl bg-forest/5 p-4 text-sm text-navy/80">
        <strong className="text-forest">12-month forecast:</strong> {market.forecast}
      </p>

      {/* Score math */}
      <details className="mt-6 rounded-2xl border border-navy/10 bg-white p-5">
        <summary className="cursor-pointer text-sm font-semibold text-navy">
          How the market score is calculated (verify the math)
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy/10 text-left text-navy/60">
                <th className="px-3 py-2 font-medium">Factor</th>
                <th className="px-3 py-2 font-medium">Weight</th>
                <th className="px-3 py-2 font-medium">Score</th>
                <th className="px-3 py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {market.scoreBreakdown.map((r) => (
                <tr key={r.factor} className="border-b border-navy/5 last:border-0 align-top">
                  <td className="px-3 py-2 text-navy/70">{r.factor}</td>
                  <td className="px-3 py-2 font-mono text-navy/60">{r.weight}</td>
                  <td className="px-3 py-2 font-mono font-semibold text-navy">{r.score}</td>
                  <td className="px-3 py-2 text-xs text-navy/50">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-navy/50">
            Composite = Σ (factor score × weight). Each input traces to a source in the table above.
          </p>
        </div>
      </details>

      {/* Full sources */}
      <details className="mt-4 rounded-2xl border border-navy/10 bg-navy/5 p-5">
        <summary className="cursor-pointer text-sm font-semibold text-navy">
          All sources for this market analysis ({market.sources.length})
        </summary>
        <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {market.sources.map((s) => (
            <li key={s.url}>
              <SourceLink source={s.label} url={s.url} />
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
