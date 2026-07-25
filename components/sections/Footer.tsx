"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function FooterLink({ item }: { item: NavItem }) {
  const className =
    "text-sm text-cream/60 hover:text-cream transition-colors";

  if (!item.href) {
    return <span className="text-sm text-cream/30">{item.name}</span>;
  }
  if (item.href.startsWith("mailto:")) {
    return (
      <a href={item.href} className={className}>
        {item.name}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {item.name}
    </Link>
  );
}

type NavItem = { name: string; href?: string };

const navigation: Record<string, NavItem[]> = {
  product: [
    { name: "Analyzer", href: "/#demo" },
    { name: "Sample Report", href: "/reports" },
    { name: "Property Score", href: "/#demo" },
    { name: "Pricing", href: "/#pricing" },
  ],
  resources: [
    { name: "For Partners", href: "/#partners" },
    { name: "Sample Reports", href: "/reports" },
  ],
  company: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Contact", href: "mailto:rob@aivoicetech.io" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-forest">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-cream">
                AI Real Estate Analyst
              </span>
            </Link>
            <p className="text-sm text-cream/60 max-w-xs">
              Zillow tells you what it sold for. We tell you if you should buy
              it.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-cream transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-cream transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          <div>
            <h3 className="text-sm font-semibold text-cream mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-cream mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-cream mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream/40">
          <p>Powered by RentCast - Zillow API - US Census Bureau</p>
          <p>&copy; 2026 AI Real Estate Analyst. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
