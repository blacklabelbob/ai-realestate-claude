"use client";

import { motion } from "framer-motion";

interface ScoreGaugeProps {
  score: number; // 0-100
  grade: string;
  size?: number;
  label?: string;
  /** light = for use on light/cream backgrounds; dark = for use on the navy cover */
  variant?: "light" | "dark";
}

// Color by score band: red < 40, gold 40-69, forest >= 70.
function bandColor(score: number) {
  if (score >= 70) return { base: "hsl(143 52% 42%)", lite: "hsl(143 60% 56%)" }; // forest
  if (score >= 40) return { base: "hsl(42 70% 52%)", lite: "hsl(42 80% 62%)" }; // gold
  return { base: "hsl(0 72% 55%)", lite: "hsl(8 82% 64%)" }; // red
}

export function ScoreGauge({
  score,
  grade,
  size = 200,
  label = "Property Score",
  variant = "dark",
}: ScoreGaugeProps) {
  const stroke = size * 0.13; // substantial, not thin
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const { base, lite } = bandColor(score);
  const gid = `gauge-grad-${Math.round(score)}-${size}`;
  const trackColor = variant === "dark" ? "rgba(245,242,235,0.14)" : "hsl(216 28% 15% / 0.08)";
  const subColor = variant === "dark" ? "text-cream/60" : "text-navy/45";
  const numColor = variant === "dark" ? "#f5f2eb" : "hsl(216 28% 15%)";

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 drop-shadow-sm">
          <defs>
            <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={lite} />
              <stop offset="100%" stopColor={base} />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - pct) }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono font-bold leading-none tabular-nums"
            style={{ fontSize: size * 0.34, color: numColor }}
          >
            {score}
          </span>
          <span className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${subColor}`}>
            out of 100
          </span>
        </div>
      </div>
      {label !== "" && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className="flex h-8 min-w-8 items-center justify-center rounded-md px-2.5 text-base font-bold text-navy shadow-sm"
            style={{ backgroundColor: base }}
          >
            {grade}
          </span>
          <span className={`text-sm font-medium ${subColor}`}>{label}</span>
        </div>
      )}
    </div>
  );
}
