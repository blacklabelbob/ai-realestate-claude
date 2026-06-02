import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllReports, getReportBySlug } from "@/lib/reports";
import { Nav } from "@/components/sections/Nav";
import { ReportView } from "@/components/report/ReportView";

export function generateStaticParams() {
  return getAllReports().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = getReportBySlug(slug);
  if (!report) return { title: "Report not found" };
  return {
    title: `${report.shortAddress}, ${report.city} ${report.state} — Score ${report.data.overall_score}/100`,
    description: report.headline,
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getReportBySlug(slug);
  if (!report) notFound();

  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <div className="no-print bg-navy py-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/reports" className="inline-flex items-center gap-2 text-sm text-cream/60 transition hover:text-cream">
            <ArrowLeft className="h-4 w-4" /> All sample reports
          </Link>
        </div>
      </div>
      <ReportView report={report} />
    </main>
  );
}
