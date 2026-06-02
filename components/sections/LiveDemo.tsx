"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Lock, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { captureLead } from "@/components/EmailGate";
import { PropertySatellite } from "@/components/report/PropertySatellite";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

const FLAGSHIP_SLUG = "583-sentinel-rd-moorestown-nj";

// The real signals our 5-agent engine scores — shown (blurred) to convey depth
// without fabricating numbers for an address we haven't analyzed yet.
const FACTOR_GROUPS: { group: string; items: string[] }[] = [
  { group: "Value & Comps", items: ["Fair market value", "Comparable sales", "Price per sq ft", "Price vs. area"] },
  { group: "Income & Cash Flow", items: ["Rent estimate", "Cap rate", "Cash-on-cash", "DSCR", "1% rule"] },
  { group: "Neighborhood", items: ["School rating", "Crime index", "Walk score", "Median income"] },
  { group: "Investment", items: ["BRRRR viability", "Flip ROI", "5-yr appreciation", "Break-even rent"] },
  { group: "Market", items: ["Days on market", "Months of supply", "YoY trend", "Net migration"] },
];
const TOTAL_SIGNALS = FACTOR_GROUPS.reduce((n, g) => n + g.items.length, 0);
// Deterministic blurred-bar widths (avoid hydration mismatch from Math.random)
const W = [62, 78, 45, 88, 54, 70, 83, 49, 66, 75, 58, 90, 52, 80, 47, 72, 60, 85, 55, 68, 77, 50];

export function LiveDemo() {
  const [address, setAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [phase, setPhase] = useState<"input" | "teaser" | "done">("input");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [partnerRef, setPartnerRef] = useState<string | null>(null);

  // Partner deploy hooks: ?address= pre-fills (QR/yard-sign), ?ref= attributes the lead.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setPartnerRef(ref);
    const a = params.get("address");
    if (a) setAddress(a);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("Please enter an address");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setPhase("teaser");
    }, 1600);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    await captureLead({
      email: email.trim(),
      source: partnerRef ? `live-demo:ref=${partnerRef}` : "live-demo",
      address: address.trim(),
      ref: partnerRef ?? undefined,
    });
    setSubmitting(false);
    setPhase("done");
  };

  const reset = () => {
    setPhase("input");
    setAddress("");
    setEmail("");
  };

  return (
    <section id="demo" className="relative overflow-hidden bg-navy py-24">
      <BackgroundBeams className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-5xl"
          >
            Try It Live — Enter Any US Address
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-cream/60"
          >
            We score <span className="text-cream">{TOTAL_SIGNALS}+ signals</span> across comps, cash flow, neighborhood,
            investment strategy &amp; market. See the depth — get the full report in your inbox.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative rounded-2xl border border-white/10 bg-card p-6 shadow-2xl sm:p-8">
            <BorderBeam size={300} duration={15} />

            <AnimatePresence mode="wait">
              {/* ---------- INPUT ---------- */}
              {phase === "input" && (
                <motion.form
                  key="input"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="123 Main St, City, State ZIP…"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-14 border-border bg-background/50 pl-12 text-lg"
                    />
                  </div>
                  <Button type="submit" variant="gold" size="xl" className="w-full" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" /> Pulling the data…
                      </span>
                    ) : (
                      "Get My Score"
                    )}
                  </Button>
                  {isAnalyzing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 pt-2">
                      {["Finding comparable sales…", "Modeling rental cash flow…", "Scoring the neighborhood…"].map(
                        (t, i) => (
                          <motion.p
                            key={t}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.4 }}
                            className="flex items-center gap-2 text-sm text-cream/50"
                          >
                            <Skeleton className="h-3 w-3 rounded-full" /> {t}
                          </motion.p>
                        ),
                      )}
                    </motion.div>
                  )}
                </motion.form>
              )}

              {/* ---------- TEASER (real address + aerial + blurred depth) ---------- */}
              {phase === "teaser" && (
                <motion.div key="teaser" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <div className="text-center">
                    <p className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-gold">
                      <MapPin className="h-3.5 w-3.5" /> Analysis ready for
                    </p>
                    <p className="mt-1 font-mono text-sm text-cream">{address}</p>
                  </div>

                  {/* their real home */}
                  <PropertySatellite address={address} showCaption={false} className="rounded-xl" height={150} />

                  {/* blurred score + blurred depth */}
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-background/40 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-cream/50">Property Score</p>
                        <p className="select-none font-mono text-4xl font-bold text-forest blur-[8px]">8 8</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
                        <Lock className="h-3.5 w-3.5" /> Locked
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                      {FACTOR_GROUPS.flatMap((g) =>
                        g.items.map((item) => ({ group: g.group, item })),
                      ).map((f, i) => (
                        <div key={f.item} className="flex items-center gap-2">
                          <span className="w-28 shrink-0 truncate text-xs text-cream/60">{f.item}</span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted/40">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-forest to-gold blur-[3px]"
                              style={{ width: `${W[i % W.length]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-center text-xs text-cream/40">
                      {TOTAL_SIGNALS}+ scored signals — values hidden until you unlock the report.
                    </p>
                  </div>

                  {/* email gate */}
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <Label htmlFor="demo-email" className="text-sm text-cream/80">
                      Email me the full report for this address
                    </Label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Input
                        id="demo-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 flex-1 border-border bg-background/50"
                      />
                      <ShimmerButton type="submit" shimmerColor="#c9982e" className="h-12 px-6 text-cream" disabled={submitting}>
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send My Report"}
                      </ShimmerButton>
                    </div>
                    <button
                      type="button"
                      onClick={reset}
                      className="text-xs text-cream/40 underline-offset-2 hover:text-cream/70 hover:underline"
                    >
                      Analyze a different address
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ---------- DONE ---------- */}
              {phase === "done" && (
                <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 py-4 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-forest" />
                  <div>
                    <h3 className="text-xl font-bold text-cream">Your report is on the way</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-cream/60">
                      We&apos;re preparing the full analysis for{" "}
                      <span className="font-mono text-cream/80">{address}</span> and it&apos;ll hit{" "}
                      <span className="text-cream/80">{email}</span> shortly. While you wait — here&apos;s a complete,
                      finished sample so you can see exactly what you&apos;re getting.
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link href={`/reports/${FLAGSHIP_SLUG}`}>
                      <ShimmerButton shimmerColor="#c9982e" className="inline-flex items-center gap-2 text-cream">
                        See a finished sample report <ArrowRight className="h-4 w-4" />
                      </ShimmerButton>
                    </Link>
                    <Button variant="ghost" onClick={reset} className="text-cream/60 hover:text-cream">
                      Analyze another
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
