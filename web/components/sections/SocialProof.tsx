"use client";

import { AnimatedTooltip } from "@/components/aceternity/animated-tooltip";
import { Marquee } from "@/components/magicui/marquee";
import { Separator } from "@/components/ui/separator";

const avatars = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Real Estate Investor",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Wholesaler",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    designation: "RE Agent",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "David Kim",
    designation: "Property Manager",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    designation: "Flipper",
    image: "https://i.pravatar.cc/150?img=5",
  },
];

const dataSources = [
  "Zillow",
  "Realtor.com",
  "RentCast",
  "PropStream",
  "BatchLeads",
  "BiggerPockets",
];

export function SocialProof() {
  return (
    <section className="bg-[#1f2a3c] py-6 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Avatars */}
          <div className="flex items-center gap-4">
            <AnimatedTooltip items={avatars} />
            <p className="text-sm text-cream/60">
              <span className="font-semibold text-cream">3,400+</span> investors,
              agents, and wholesalers
            </p>
          </div>

          {/* Separator - visible only on desktop */}
          <Separator
            orientation="vertical"
            className="hidden md:block h-8 bg-white/10"
          />

          {/* Right - Marquee */}
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
