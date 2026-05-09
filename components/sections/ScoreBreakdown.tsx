"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  DollarSign,
  MapPin,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const scoreData = [
  {
    name: "Market",
    value: 71,
    weight: "15%",
    fill: "#5a9a6e",
    icon: Activity,
    description: "Local market conditions and trends",
    methodology:
      "Analyzes days on market, price trends, inventory levels, and seasonal patterns.",
    dataSource: "Realtor.com, Zillow market data",
    interpretation: "71 = Moderate seller's market with balanced growth",
  },
  {
    name: "Investment",
    value: 79,
    weight: "20%",
    fill: "#4a6fa5",
    icon: TrendingUp,
    description: "BRRRR, flip, and hold potential",
    methodology:
      "Calculates ARV, rehab costs, cash-on-cash return, and equity capture potential.",
    dataSource: "Comparable sales, contractor cost databases",
    interpretation:
      "79 = Strong flip potential with 15-20% projected profit margin",
  },
  {
    name: "Neighborhood",
    value: 82,
    weight: "20%",
    fill: "#c9982e",
    icon: MapPin,
    description: "Safety, schools, and amenities",
    methodology:
      "Scores crime rates, school ratings, walkability, and proximity to services.",
    dataSource: "US Census, GreatSchools, Walk Score API",
    interpretation: "82 = Above-average neighborhood with good schools",
  },
  {
    name: "Income",
    value: 76,
    weight: "20%",
    fill: "#2d8a4e",
    icon: DollarSign,
    description: "Rental cash flow projection",
    methodology:
      "Estimates monthly rent, vacancy, expenses, and net operating income.",
    dataSource: "RentCast, local rental comps",
    interpretation: "76 = Positive cash flow expected, 6-8% cap rate",
  },
  {
    name: "Comps",
    value: 88,
    weight: "25%",
    fill: "#1a2332",
    icon: BarChart3,
    description: "Comparable sales analysis",
    methodology:
      "Identifies similar properties sold within 6 months and 1 mile radius.",
    dataSource: "MLS data via Zillow, Realtor.com",
    interpretation: "88 = Strong comp support, property priced below market",
  },
];

// Reverse for radial chart (outer to inner)
const chartData = [...scoreData].reverse();

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ScoreBreakdown() {
  return (
    <section className="py-24 bg-cream dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Five-Factor Scoring Model — Built by Real Estate Analysts, Not a
            Spreadsheet
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {`We don't just give you a number. We tell you which strategy wins —
            buy and hold, BRRRR, flip, or pass.`}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Radial Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square max-w-md mx-auto w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="25%"
                outerRadius="90%"
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-4xl lg:text-5xl font-bold font-mono text-foreground">
                  84
                </span>
                <span className="block text-xl font-bold text-gold">/B+</span>
              </div>
            </div>
          </motion.div>

          {/* Right - HoverCard items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {scoreData.map((item, index) => {
              const Icon = item.icon;
              return (
                <HoverCard key={item.name} openDelay={200}>
                  <HoverCardTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-forest/50 transition-colors cursor-pointer"
                    >
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg"
                        style={{ backgroundColor: `${item.fill}20` }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: item.fill }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {item.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.weight}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <span
                        className="text-2xl font-mono font-bold"
                        style={{ color: item.fill }}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80" side="left">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold">Methodology</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.methodology}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">Data Source</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.dataSource}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">
                          Score Interpretation
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.interpretation}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
