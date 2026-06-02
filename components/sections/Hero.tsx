"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Spotlight } from "@/components/aceternity/spotlight";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Sparkles } from "@/components/aceternity/sparkles";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Hero() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-navy">
      {/* Spotlight effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#2d8a4e"
      />
      <Spotlight
        className="-top-40 right-0 md:right-60 md:-top-20"
        fill="#c9982e"
      />

      {/* Animated grid pattern */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.08}
        duration={3}
        repeatDelay={1}
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center"
        >
          {/* Left column - Content */}
          <motion.div variants={fadeInUp} className="lg:col-span-3 space-y-8">
            {/* Beta badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-forest/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-forest animate-pulse" />
              <span className="text-sm text-cream/80">
                Now in Beta - 14 Analysis Modes
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-cream text-balance">
              Type any address.{" "}
              <span className="text-forest">Get the score</span> your agent
              never shows you.
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-cream/60 max-w-lg text-pretty">
              5 AI agents analyze any US property in 60 seconds. Whether you&apos;re
              <span className="text-cream/90"> buying</span>,
              <span className="text-cream/90"> selling</span>, or
              <span className="text-cream/90"> investing</span> — get comps, rental cash
              flow, BRRRR &amp; flip math, neighborhood score, and a report you can hand to
              your client or lender.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <MovingBorderButton
                onClick={scrollToDemo}
                containerClassName="h-12 w-full sm:w-auto"
                className="px-8"
              >
                Score My Property
              </MovingBorderButton>
              <Link href="/reports">
                <ShimmerButton
                  shimmerColor="#c9982e"
                  background="rgba(45, 138, 78, 0.1)"
                  className="text-cream/90 hover:text-cream"
                >
                  See Sample Reports
                </ShimmerButton>
              </Link>
            </div>

            {/* Trust line */}
            <p className="text-sm text-cream/40 pt-2">
              Free - No signup - Results in 60 seconds
            </p>
          </motion.div>

          {/* Right column - Mockup card */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl border border-white/10 bg-card p-6 shadow-2xl">
              <BorderBeam size={250} duration={12} delay={9} />

              {/* Address input mockup */}
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-background/50 px-4 py-3">
                  <span className="text-sm text-muted-foreground font-mono">
                    1234 Maple Street, Austin TX 78701
                  </span>
                </div>

                {/* Progress bar */}
                <Progress
                  value={100}
                  className="h-2 bg-forest/20"
                  indicatorClassName="bg-forest"
                />

                {/* Score card */}
                <div className="text-center space-y-4 pt-4">
                  {/* Score number */}
                  <div className="flex items-center justify-center gap-4">
                    <span className="font-mono text-7xl lg:text-8xl font-bold text-forest">
                      <NumberTicker value={84} delay={0.5} />
                    </span>
                    <Sparkles>
                      <Badge
                        variant="gold"
                        className="text-xl px-3 py-1 font-bold"
                      >
                        B+
                      </Badge>
                    </Sparkles>
                  </div>

                  {/* Signal badge */}
                  <Badge variant="success" className="px-4 py-1">
                    BUY SIGNAL
                  </Badge>
                </div>

                {/* Mini progress bars */}
                <div className="space-y-3 pt-4">
                  {[
                    { label: "Comps", value: 88, color: "bg-[#1a2332]" },
                    { label: "Income", value: 76, color: "bg-forest" },
                    { label: "Neighborhood", value: 82, color: "bg-gold" },
                    { label: "Investment", value: 79, color: "bg-[#4a6fa5]" },
                    { label: "Market", value: 71, color: "bg-[#5a9a6e]" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-24">
                        {item.label}
                      </span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: 1 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground w-8">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
