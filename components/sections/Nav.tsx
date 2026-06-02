"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export function Nav() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-white/10 bg-navy/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-cream">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest">
            <Home className="h-4 w-4 text-cream" />
          </span>
          <span className="font-bold">AI Real Estate Analyst</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/reports" className="rounded-lg px-3 py-2 text-sm text-cream/70 transition hover:text-cream">
            Sample Reports
          </Link>
          <Link href="/#pricing" className="rounded-lg px-3 py-2 text-sm text-cream/70 transition hover:text-cream">
            Pricing
          </Link>
          <Link
            href="/#demo"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:brightness-110"
          >
            Score a Property
          </Link>
        </nav>
      </div>
    </header>
  );
}
