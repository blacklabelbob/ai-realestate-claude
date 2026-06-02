"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

// Avg buyer overpays ~12% above target price (Clever Real Estate 2024 American Home Buyer Report).
const OVERPAY_RATE = 0.12;
const REPORT_COST = 39;

function usd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function RoiCalculator() {
  const [price, setPrice] = useState(450000);
  const overpay = Math.round(price * OVERPAY_RATE);
  const multiple = Math.round(overpay / REPORT_COST);

  return (
    <div className="rounded-2xl border border-gold/30 bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2 text-gold">
        <Calculator className="h-5 w-5" />
        <h3 className="text-lg font-bold text-cream">What being wrong actually costs</h3>
      </div>
      <p className="mt-2 text-sm text-cream/60">
        Drag to your price range. The average buyer pays{" "}
        <a
          href="https://listwithclever.com/research/homebuyer-sentiment/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline decoration-dotted"
        >
          12% over their target
        </a>
        . A $39 report that flags an overpriced listing pays for itself many times over.
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-cream/70">
          <span>Target purchase price</span>
          <span className="font-mono text-lg font-bold text-cream">{usd(price)}</span>
        </div>
        <input
          type="range"
          min={150000}
          max={1500000}
          step={10000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
          aria-label="Target purchase price"
        />
        <div className="flex justify-between text-xs text-cream/40">
          <span>$150k</span>
          <span>$1.5M</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <motion.div key={overpay} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="rounded-xl bg-red-500/10 p-4">
          <p className="text-xs uppercase tracking-wide text-red-300/80">Typical overpay (12%)</p>
          <p className="mt-1 font-mono text-2xl font-bold text-red-300">{usd(overpay)}</p>
        </motion.div>
        <div className="rounded-xl bg-forest/10 p-4">
          <p className="text-xs uppercase tracking-wide text-forest/90">Cost of the report</p>
          <p className="mt-1 font-mono text-2xl font-bold text-forest">{usd(REPORT_COST)}</p>
        </div>
        <motion.div key={multiple} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="rounded-xl bg-gold/10 p-4">
          <p className="text-xs uppercase tracking-wide text-gold/90">Report pays for itself</p>
          <p className="mt-1 font-mono text-2xl font-bold text-gold">{multiple.toLocaleString()}×</p>
        </motion.div>
      </div>
    </div>
  );
}
