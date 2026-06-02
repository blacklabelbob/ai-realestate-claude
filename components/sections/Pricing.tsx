"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import { Meteors } from "@/components/aceternity/meteors";
import { RoiCalculator } from "@/components/sections/RoiCalculator";

const plans = [
  {
    name: "Per-Deal",
    price: { monthly: 39, annual: 39 },
    isPerReport: true,
    description: "Run one address. Get the full report. No subscription.",
    // Source: HomeAdvisor 2025 — appraisal $314–$423; only values the home, nothing else.
    justification: "A home appraisal costs $314–$423 and only tells you today's value. This gives you comps, cash flow, BRRRR, flip, neighborhood & market — for less than a tank of gas.",
    features: [
      "Single property analysis",
      "Full multi-page report (hosted + PDF)",
      "All 5 scoring factors",
      "Comps, cash flow & neighborhood",
      "Download or share instantly",
    ],
    cta: "Run a Deal",
    href: "/#demo",
    variant: "ghost" as const,
  },
  {
    name: "Pro",
    price: { monthly: 79, annual: 63 },
    popular: true,
    description: "Unlimited reports + PDF export + saved portfolios",
    // Source: Bay Mgmt Group 5,000+ landlord survey — 55% faced a $2,000+ repair; bad underwriting = $5–15k/yr.
    justification: "One cash-flow-negative property you didn't underwrite costs $5,000–$15,000 a year. Pro is $948/year. The math isn't close.",
    features: [
      "Unlimited property analyses",
      "Unlimited PDF exports",
      "Saved portfolios & history",
      "Bulk address upload",
      "Comparison reports",
      "Market trend alerts",
      "Priority email support",
      "Export to CSV",
    ],
    cta: "Start Free Trial",
    href: "/#demo",
    variant: "gold" as const,
  },
  {
    name: "Agency",
    price: { monthly: 199, annual: 159 },
    description: "White-label reports + 5 seats + client-ready output",
    // Source: Ran Biderman 2026 — RE coaching $5k–$50k/yr; Clever 2025 — avg buyer commission $9,818.
    justification: "Coaching programs run $5,000–$50,000/year. One buyer-side commission averages $9,818. Agency is $2,388/year and runs unlimited reports for every client.",
    features: [
      "Everything in Pro",
      "5 team seats included",
      "White-label / branded reports",
      "Custom domain",
      "Client-ready PDFs with your logo",
      "Webhook integrations",
      "Priority support",
      "Custom API limits",
    ],
    cta: "Contact Sales",
    href: "mailto:rob@boostuppayments.com?subject=AI%20Real%20Estate%20Analyst%20—%20Partner%20inquiry",
    variant: "ghost" as const,
  },
];

// Each anchored to a verified source (see content/pricing-justification.md).
const costOfWrong = [
  { label: "Avg. amount buyers overpay vs. target", value: "$58,510", href: "https://listwithclever.com/research/homebuyer-sentiment/", source: "Clever Real Estate, 2024" },
  { label: "Buyers with at least one purchase regret", value: "82%", href: "https://listwithclever.com/research/homebuyer-sentiment/", source: "Clever Real Estate, 2024" },
  { label: "Avg. surprise cost first-time buyers hit", value: "$5,356", href: "https://themortgagepoint.com/2025/04/23/first-time-homebuyers-facing-regret-pressure-and-hidden-costs/", source: "The Mortgage Point, 2025" },
  { label: "Annual hidden cost of owning a home", value: "$21,400", href: "https://www.bankrate.com/home-equity/hidden-costs-of-homeownership-study/", source: "Bankrate, 2025" },
  { label: "Landlords who faced a $2,000+ repair last yr", value: "55%", href: "https://www.baymgmtgroup.com/blog/rising-costs-are-changing-rental-housing/", source: "Bay Mgmt Group survey" },
  { label: "Avg. buyer-side agent commission", value: "$9,818", href: "https://www.prnewswire.com/news-releases/agent-commissions-edge-higher-in-2025-one-year-after-landmark-nar-settlement-302483289.html", source: "Clever / PR Newswire, 2025" },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream text-balance">
            Priced like a coffee. Saves like a coach.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-cream/60">
            Real estate is the most expensive decision most people make with the least analysis. Here is what
            getting it wrong costs — every figure is sourced.
          </p>
        </motion.div>

        {/* Cost-of-being-wrong stat band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {costOfWrong.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/10 bg-card p-4 transition hover:border-gold/40"
              title={`Source: ${s.source}`}
            >
              <p className="font-mono text-2xl font-bold text-gold">{s.value}</p>
              <p className="mt-1 text-xs leading-snug text-cream/60">{s.label}</p>
              <p className="mt-1 text-[10px] text-cream/30 underline decoration-dotted group-hover:text-cream/50">
                {s.source}
              </p>
            </a>
          ))}
        </motion.div>

        {/* ROI calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl"
        >
          <RoiCalculator />
        </motion.div>

        {/* Annual/Monthly toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Label htmlFor="billing-toggle" className={`text-sm ${!isAnnual ? "text-cream" : "text-cream/50"}`}>
            Monthly
          </Label>
          <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
          <Label htmlFor="billing-toggle" className={`text-sm ${isAnnual ? "text-cream" : "text-cream/50"}`}>
            Annual
          </Label>
          {isAnnual && <Badge variant="gold" className="ml-2">Save 20%</Badge>}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative h-full overflow-hidden ${plan.popular ? "border-gold shadow-lg shadow-gold/10" : "border-border"}`}>
                {plan.popular && <Meteors number={10} />}
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.popular && <Badge variant="gold">Most Popular</Badge>}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-mono text-foreground">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">{plan.isPerReport ? "/report" : "/mo"}</span>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="relative z-10 space-y-5">
                  {/* Justification callout */}
                  <p className="rounded-lg border-l-2 border-gold bg-gold/5 px-3 py-2 text-xs italic leading-snug text-muted-foreground">
                    {plan.justification}
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-forest shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.popular ? (
                    <MovingBorderButton
                      as={Link}
                      href={plan.href}
                      containerClassName="w-full h-11"
                      className="w-full text-sm"
                    >
                      {plan.cta}
                    </MovingBorderButton>
                  ) : plan.href.startsWith("mailto:") ? (
                    <Button asChild variant={plan.variant} className="w-full">
                      <a href={plan.href}>{plan.cta}</a>
                    </Button>
                  ) : (
                    <Button asChild variant={plan.variant} className="w-full">
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-cream/40">
          Sources: Clever Real Estate (2024–2025 American Home Buyer Reports), Bankrate (2025), The Mortgage Point
          (2025), Bay Management Group (5,000+ landlord survey), HomeAdvisor (2025), PR Newswire / NAR. Full citation
          list in our pricing methodology.
        </p>
      </div>
    </section>
  );
}
