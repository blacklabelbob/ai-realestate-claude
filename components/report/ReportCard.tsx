import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import type { Report } from "@/lib/reports";
import { ScoreGauge } from "@/components/report/ScoreGauge";
import { PropertySatellite } from "@/components/report/PropertySatellite";

export function ReportCard({ report }: { report: Report }) {
  const d = report.data;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-xl transition hover:border-gold/40">
      <PropertySatellite
        address={d.address}
        verified={report.verified}
        height={132}
        compact
        showCaption={false}
        className="rounded-none border-0 border-b border-white/10 shadow-none"
      />
      <div className={`bg-gradient-to-br ${report.heroGradient} p-6`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-cream/70">
              <MapPin className="h-3.5 w-3.5" /> {report.city}, {report.state}
            </p>
            <h3 className="mt-1 text-xl font-bold text-cream">{report.shortAddress}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {report.audiences.map((a) => (
                <span key={a} className="rounded-full bg-cream/15 px-2 py-0.5 text-[10px] font-medium text-cream">
                  {a}
                </span>
              ))}
            </div>
          </div>
          <ScoreGauge score={d.overall_score} grade={report.grade} size={92} label="" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-md bg-navy/60 px-2.5 py-1 text-xs font-semibold text-cream">
          {report.signal}
        </span>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{report.headline}</p>
        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/reports/${report.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy transition hover:brightness-110"
          >
            View Report <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={report.pdfUrl}
            download
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/15 px-3 py-2.5 text-sm text-cream/80 transition hover:text-cream"
            aria-label="Download PDF"
          >
            <Download className="h-4 w-4" /> PDF
          </a>
        </div>
      </div>
    </div>
  );
}
