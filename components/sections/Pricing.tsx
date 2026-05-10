"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import { Meteors } from "@/components/aceternity/meteors";

const plans = [
  {
    name: "Per-Deal",
    price: { monthly: 39, annual: 39 },
    isPerReport: true,
    description: "Run one address. Get the full PDF. No subscription.",
    features: [
      "Single property analysis",
      "Full 6-page PDF report",
      "All 5 scoring factors",
      "Email delivery",
      "48-hour support",
    ],
    cta: "Run a Deal",
    variant: "ghost" as const,
  },
  {
    name: "Pro",
    price: { monthly: 79, annual: 63 },
    popular: true,
    description:
      "Unlimited reports + PDF export + API access + saved portfolios",
    features: [
      "Unlimited property analyses",
      "Unlimited PDF exports",
      "API access (1,000 calls/mo)",
      "Saved portfolios",
      "Bulk address upload",
      "Priority email support",
      "Custom branding",
      "Export to CSV",
      "Comparison reports",
      "Market trend alerts",
      "Chrome extension",
      "Zapier integration",
    ],
    cta: "Start Free Trial",
    variant: "gold" as const,
  },
  {
    name: "Agency",
    price: { monthly: 199, annual: 159 },
    description: "White-label PDFs + 5 seats + webhooks + priority support",
    features: [
      "Everything in Pro",
      "5 team seats included",
      "White-label PDFs",
      "Custom domain",
      "Webhook integrations",
      "Priority phone support",
      "Dedicated account manager",
      "Custom API limits",
      "SSO/SAML support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    variant: "ghost" as const,
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

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
            Simple Pricing — Pay Per Deal or Go Unlimited
          </h2>
        </motion.div>

        {/* Annual/Monthly toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <Label
            htmlFor="billing-toggle"
            className={`text-sm ${!isAnnual ? "text-cream" : "text-cream/50"}`}
          >
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label
            htmlFor="billing-toggle"
            className={`text-sm ${isAnnual ? "text-cream" : "text-cream/50"}`}
          >
            Annual
          </Label>
          {isAnnual && (
            <Badge variant="gold" className="ml-2">
              Save 20%
            </Badge>
          )}
        </motion.div>

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
              <Card
                className={`relative h-full overflow-hidden ${
                  plan.popular
                    ? "border-gold shadow-lg shadow-gold/10"
                    : "border-border"
                }`}
              >
                {plan.popular && <Meteors number={10} />}

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.popular && (
                      <Badge variant="gold">Most Popular</Badge>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-mono text-foreground">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.isPerReport ? "/report" : "/mo"}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground pt-2">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  {/* Features list */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-forest shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {plan.popular ? (
                    <MovingBorderButton
                      containerClassName="w-full h-11"
                      className="w-full text-sm"
                    >
                      {plan.cta}
                    </MovingBorderButton>
                  ) : (
                    <Button variant={plan.variant} className="w-full">
                      {plan.cta}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
