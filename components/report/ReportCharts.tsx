"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import type { CashflowItem, AppreciationRow, CategoryScore } from "@/lib/reports";
import { parseMoney } from "@/lib/reports";

const NAVY = "hsl(216 28% 15%)";
const FOREST = "hsl(143 52% 42%)";
const GOLD = "hsl(42 70% 50%)";
const RED = "hsl(0 72% 55%)";

function fmtMoney(n: number) {
  const sign = n < 0 ? "-" : "";
  const a = Math.abs(n);
  if (a >= 1000) return `${sign}$${(a / 1000).toFixed(a >= 10000 ? 0 : 1)}k`;
  return `${sign}$${a}`;
}

/* ------------------------------------------------------------------ */
/* Cash-flow waterfall — running balance from gross income to net      */
/* ------------------------------------------------------------------ */
export function CashflowWaterfall({ items }: { items: CashflowItem[] }) {
  // Build a floating-bar waterfall. Treat the last row as the "Net" total bar.
  const steps = items.slice(0, -1);
  const net = items[items.length - 1];

  let running = 0;
  const data = steps.map((it) => {
    const val = parseMoney(it.monthly);
    const start = running;
    running += val;
    return {
      name: it.item.replace(/\s*\(.*?\)\s*/g, "").trim(),
      base: Math.min(start, running),
      delta: Math.abs(val),
      raw: val,
      isPos: val >= 0,
    };
  });
  // total bar
  data.push({
    name: "Net Cash Flow",
    base: Math.min(0, running),
    delta: Math.abs(running),
    raw: parseMoney(net.monthly),
    isPos: running >= 0,
    // @ts-expect-error decorate
    isTotal: true,
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 56 }} barCategoryGap="22%">
          <CartesianGrid strokeDasharray="3 3" stroke={NAVY} strokeOpacity={0.08} vertical={false} />
          <XAxis
            dataKey="name"
            angle={-38}
            textAnchor="end"
            interval={0}
            height={70}
            tick={{ fontSize: 10, fill: NAVY, fillOpacity: 0.6 }}
            tickLine={false}
            axisLine={{ stroke: NAVY, strokeOpacity: 0.15 }}
          />
          <YAxis
            tickFormatter={fmtMoney}
            tick={{ fontSize: 10, fill: NAVY, fillOpacity: 0.5 }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            cursor={{ fill: NAVY, fillOpacity: 0.04 }}
            formatter={(_v, _n, p) => [`${p.payload.raw < 0 ? "-" : "+"}$${Math.abs(p.payload.raw).toLocaleString()}/mo`, p.payload.name]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(26,35,50,0.1)",
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(26,35,50,0.12)",
            }}
          />
          <Bar dataKey="base" stackId="a" fill="transparent" isAnimationActive={false} />
          <Bar dataKey="delta" stackId="a" radius={[3, 3, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                // @ts-expect-error decorate
                fill={d.isTotal ? (d.isPos ? FOREST : RED) : d.isPos ? FOREST : GOLD}
                // @ts-expect-error decorate
                fillOpacity={d.isTotal ? 1 : d.isPos ? 0.85 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Appreciation projection — conservative / moderate / aggressive band */
/* ------------------------------------------------------------------ */
export function AppreciationChart({ rows }: { rows: AppreciationRow[] }) {
  const data = rows.map((r) => ({
    year: r.year.replace("Year ", "Yr "),
    conservative: parseMoney(r.conservative),
    moderate: parseMoney(r.moderate),
    aggressive: parseMoney(r.aggressive),
  }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="appAgg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={FOREST} stopOpacity={0.28} />
              <stop offset="100%" stopColor={FOREST} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="appCons" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={NAVY} stopOpacity={0.16} />
              <stop offset="100%" stopColor={NAVY} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={NAVY} strokeOpacity={0.08} vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: NAVY, fillOpacity: 0.6 }}
            tickLine={false}
            axisLine={{ stroke: NAVY, strokeOpacity: 0.15 }}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 10, fill: NAVY, fillOpacity: 0.5 }}
            tickLine={false}
            axisLine={false}
            width={48}
            domain={["dataMin - 40000", "dataMax + 40000"]}
          />
          <Tooltip
            formatter={(v: number, n) => [`$${v.toLocaleString()}`, String(n).charAt(0).toUpperCase() + String(n).slice(1)]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(26,35,50,0.1)",
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(26,35,50,0.12)",
            }}
          />
          <Area
            type="monotone"
            dataKey="aggressive"
            stroke={FOREST}
            strokeWidth={2}
            fill="url(#appAgg)"
            dot={{ r: 2.5, fill: FOREST }}
          />
          <Area
            type="monotone"
            dataKey="moderate"
            stroke={GOLD}
            strokeWidth={2.5}
            fill="none"
            dot={{ r: 2.5, fill: GOLD }}
          />
          <Area
            type="monotone"
            dataKey="conservative"
            stroke={NAVY}
            strokeOpacity={0.7}
            strokeWidth={2}
            strokeDasharray="5 4"
            fill="url(#appCons)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Category scores — horizontal bar mini-chart for the cover/summary   */
/* ------------------------------------------------------------------ */
export function CategoryRadial({
  categories,
}: {
  categories: Record<string, CategoryScore>;
}) {
  const entries = Object.entries(categories);
  const data = entries.map(([name, c]) => ({
    name,
    score: c.score,
    fill: c.score >= 70 ? FOREST : c.score >= 40 ? GOLD : RED,
  }));

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="28%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
          barSize={12}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: "rgba(26,35,50,0.06)" }} dataKey="score" cornerRadius={6} angleAxisId={0} />
          <Tooltip
            formatter={(v: number, _n, p) => [`${v}/100`, p.payload.name]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(26,35,50,0.1)",
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(26,35,50,0.12)",
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Neighborhood scores — vertical bars                                 */
/* ------------------------------------------------------------------ */
export function NeighborhoodBars({ scores }: { scores: Record<string, number> }) {
  const data = Object.entries(scores).map(([name, v]) => ({
    name: name.replace(" / ", " /\n"),
    score: v,
    fill: v >= 70 ? FOREST : v >= 40 ? GOLD : RED,
  }));
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 36 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={NAVY} strokeOpacity={0.08} vertical={false} />
          <XAxis
            dataKey="name"
            angle={-28}
            textAnchor="end"
            interval={0}
            height={48}
            tick={{ fontSize: 10, fill: NAVY, fillOpacity: 0.6 }}
            tickLine={false}
            axisLine={{ stroke: NAVY, strokeOpacity: 0.15 }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: NAVY, fillOpacity: 0.5 }}
            tickLine={false}
            axisLine={false}
            width={28}
          />
          <Tooltip
            cursor={{ fill: NAVY, fillOpacity: 0.04 }}
            formatter={(v: number) => [`${v}/100`, "Score"]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(26,35,50,0.1)",
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(26,35,50,0.12)",
            }}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.fill} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
