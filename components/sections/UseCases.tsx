"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  BarChart3,
  Home,
  FileText,
  Calculator,
  Users,
  Clipboard,
  MapPin,
  GraduationCap,
  CheckSquare,
  Zap,
  Scale,
  GitCompare,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";

const useCases = {
  investor: {
    title: "Investor",
    items: [
      {
        title: "BRRRR Model",
        description:
          "Calculate Buy, Rehab, Rent, Refinance, Repeat scenarios with accurate ARV and cash-out projections.",
        icon: TrendingUp,
        tags: ["Cash-out Refi", "Equity Capture"],
        isFullWidth: true,
      },
      {
        title: "Flip ROI Calculator",
        description:
          "Estimate rehab costs, holding costs, and profit margins for fix-and-flip deals.",
        icon: DollarSign,
        tags: ["Profit Margin", "Exit Timeline"],
      },
      {
        title: "Cap Rate Analysis",
        description:
          "Instantly calculate capitalization rates based on NOI and purchase price.",
        icon: BarChart3,
        tags: ["NOI", "Yield"],
      },
      {
        title: "Cash Flow Projections",
        description:
          "Monthly and annual cash flow estimates with vacancy and maintenance reserves.",
        icon: Calculator,
        tags: ["Monthly P&L"],
      },
    ],
  },
  agent: {
    title: "Agent",
    items: [
      {
        title: "MLS Listing Writer",
        description:
          "AI-generated property descriptions optimized for buyer engagement and SEO.",
        icon: FileText,
        tags: ["AI Copy", "MLS Ready"],
        isFullWidth: true,
      },
      {
        title: "CMA Comps Report",
        description:
          "Professional comparable market analysis with visual charts and data tables.",
        icon: BarChart3,
        tags: ["Client Ready"],
      },
      {
        title: "Buyer Score Summary",
        description:
          "One-page score summary to share with prospective buyers and build trust.",
        icon: Users,
        tags: ["Lead Magnet"],
      },
      {
        title: "Shareable PDF",
        description:
          "Branded, white-label PDFs you can send directly to clients.",
        icon: Clipboard,
        tags: ["Your Logo"],
      },
    ],
  },
  hunter: {
    title: "House Hunter",
    items: [
      {
        title: "Neighborhood Score",
        description:
          "Comprehensive safety, amenities, and livability ratings for any zip code.",
        icon: MapPin,
        tags: ["Crime Data", "Walkability"],
        isFullWidth: true,
      },
      {
        title: "School District Data",
        description:
          "GreatSchools ratings and district boundaries for family-friendly home searches.",
        icon: GraduationCap,
        tags: ["K-12 Ratings"],
      },
      {
        title: "30-Year Mortgage Calc",
        description:
          "Estimate monthly payments with current rates, taxes, and insurance.",
        icon: Calculator,
        tags: ["PITI Breakdown"],
      },
      {
        title: "Move-In Checklist",
        description:
          "Downloadable checklist of tasks and inspections before closing.",
        icon: CheckSquare,
        tags: ["PDF Download"],
      },
    ],
  },
  wholesaler: {
    title: "Wholesaler",
    items: [
      {
        title: "ARV in 60 Seconds",
        description:
          "Instant After Repair Value estimates to qualify deals on the spot.",
        icon: Zap,
        tags: ["Speed", "Accuracy"],
        isFullWidth: true,
      },
      {
        title: "MAO Formula Calculator",
        description:
          "Maximum Allowable Offer with customizable repair and profit assumptions.",
        icon: Scale,
        tags: ["70% Rule"],
      },
      {
        title: "Side-by-Side Compare",
        description:
          "Compare up to 5 properties simultaneously to prioritize your pipeline.",
        icon: GitCompare,
        tags: ["Batch Analysis"],
      },
      {
        title: "Buyer-Ready PDF",
        description:
          "Professional deal package to send to your cash buyer network.",
        icon: FileText,
        tags: ["Close Deals"],
      },
    ],
  },
};

export function UseCases() {
  return (
    <section className="py-24 bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream text-balance">
            For buyers, sellers &amp; the pros who serve them
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-cream/60">
            One engine, five lenses. Pick your seat — every mode ends in the same defensible,
            client-ready report.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="investor" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="investor">Investor</TabsTrigger>
              <TabsTrigger value="agent">Agent</TabsTrigger>
              <TabsTrigger value="hunter">House Hunter</TabsTrigger>
              <TabsTrigger value="wholesaler">Wholesaler</TabsTrigger>
            </TabsList>

            {Object.entries(useCases).map(([key, { items }]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BentoGrid>
                    {items.map((item, index) => (
                      <BentoGridItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        tags={item.tags}
                        isFullWidth={item.isFullWidth}
                      />
                    ))}
                  </BentoGrid>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold/20"
          >
            See a real report for your use case <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
