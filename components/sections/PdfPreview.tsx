"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroParallax } from "@/components/aceternity/hero-parallax";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { FileText, ArrowRight } from "lucide-react";

const pdfPages = [
  {
    title: "Cover & Property Score",
    gradient: "bg-gradient-to-br from-navy via-[#2a3545] to-forest",
    image: "/report-previews/cover.webp",
  },
  {
    title: "Comparable Sales + Map",
    gradient: "bg-gradient-to-br from-forest via-[#3a7a5e] to-gold/50",
    image: "/report-previews/comps.webp",
  },
  {
    title: "Rental Cash-Flow Model",
    gradient: "bg-gradient-to-br from-gold/80 via-[#a88a3a] to-navy",
    image: "/report-previews/cashflow.webp",
  },
  {
    title: "Neighborhood Intelligence",
    gradient: "bg-gradient-to-br from-[#4a6fa5] via-navy to-forest",
    image: "/report-previews/neighborhood.webp",
  },
  {
    title: "Market Evidence — Sourced",
    gradient: "bg-gradient-to-br from-forest via-[#5a9a6e] to-gold/60",
    image: "/report-previews/market.webp",
  },
  {
    title: "5-Agent Score Breakdown",
    gradient: "bg-gradient-to-br from-navy via-[#1a2332] to-[#4a6fa5]",
    image: "/report-previews/score.webp",
  },
];

export function PdfPreview() {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream text-balance">
            A 6-Page Report That Closes Deals
          </h2>
          <p className="text-lg text-cream/60 max-w-3xl mx-auto">
            Every analysis generates a branded PDF with comps map, cash flow
            waterfall, neighborhood heatmap, and investment scenarios. Hand it
            to your buyer, your contractor, or your lender.
          </p>
        </motion.div>
      </div>

      {/* Parallax section */}
      <HeroParallax products={pdfPages} />

      {/* CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="/reports/583-sentinel-rd-moorestown.pdf" download>
            <ShimmerButton
              shimmerColor="#c9982e"
              className="text-cream inline-flex items-center gap-2"
            >
              <FileText className="h-5 w-5" />
              Download Sample Report (PDF)
            </ShimmerButton>
          </a>
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 text-cream/80 transition hover:text-cream"
          >
            View all sample reports <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
