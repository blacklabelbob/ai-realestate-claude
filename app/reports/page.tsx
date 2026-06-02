import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllReports } from "@/lib/reports";
import { Nav } from "@/components/sections/Nav";
import { ReportCard } from "@/components/report/ReportCard";

export const metadata: Metadata = {
  title: "Sample Property Reports | AI Real Estate Analyst",
  description:
    "Browse real, full-length AI property analyses — composite score, comps, rental cash flow, BRRRR/flip math, neighborhood, and the verdict. View on-site or download the PDF.",
};

export default function ReportsGallery() {
  const reports = getAllReports();
  return (
    <main className="min-h-screen bg-navy">
      <Nav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-cream/60 transition hover:text-cream">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            See exactly what you get — <span className="text-forest">before</span> you pay.
          </h1>
          <p className="mt-4 text-lg text-cream/60">
            These are complete, real analyses our 5-agent engine produces for any US address. Read the whole thing
            on this page or download the branded PDF. The free preview is open; the deal math unlocks with your
            email — and it stays right here.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <ReportCard key={r.slug} report={r} />
          ))}
        </div>

        <p className="mt-10 text-sm text-cream/40">
          Reports are AI-generated research for educational purposes only — not investment advice. Verify with
          licensed professionals before any decision.
        </p>
      </section>
    </main>
  );
}
