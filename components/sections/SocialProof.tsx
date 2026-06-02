"use client";

import { ShieldCheck, Database } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { Separator } from "@/components/ui/separator";

// Public, verifiable data sources the analysis is built on — not fabricated user counts.
const dataSources = [
  "Redfin",
  "Zillow",
  "FRED",
  "U.S. Census",
  "GreatSchools",
  "County Records",
  "RentCast",
  "Walk Score",
];

export function SocialProof() {
  return (
    <section className="bg-[#1f2a3c] py-6 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - credibility, not fake faces */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Now in private beta
            </span>
            <p className="flex items-center gap-2 text-sm text-cream/60">
              <Database className="hidden h-4 w-4 shrink-0 text-cream/40 sm:block" />
              Built on{" "}
              <span className="font-semibold text-cream">public data</span> from
              Redfin, Zillow, FRED, the U.S. Census, GreatSchools &amp; county
              records.
            </p>
          </div>

          {/* Separator - visible only on desktop */}
          <Separator
            orientation="vertical"
            className="hidden md:block h-8 bg-white/10"
          />

          {/* Right - source marquee */}
          <div className="flex-1 max-w-xl overflow-hidden">
            <Marquee pauseOnHover speed={30} className="[--gap:2rem]">
              {dataSources.map((source, index) => (
                <div key={source} className="flex items-center">
                  <span className="text-sm font-medium text-cream/40 hover:text-cream/60 transition-colors whitespace-nowrap">
                    {source}
                  </span>
                  {index < dataSources.length - 1 && (
                    <span className="mx-4 text-white/20">|</span>
                  )}
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
