"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Palette,
  Database,
  QrCode,
  Award,
} from "lucide-react";

const PARTNER_MAILTO =
  "mailto:rob@aivoicetech.io?subject=AI%20Real%20Estate%20Analyst%20—%20Partner%20inquiry";

const partnerCards = [
  {
    icon: Palette,
    title: "Your brand on every page",
    description:
      "White-label reports carry your logo, photo, colors, and contact info — front to back. Clients see you, not us.",
  },
  {
    icon: Database,
    title: "Deploy to your database",
    description:
      "Drop your branded link into one email blast to your sphere and past clients. A lead magnet your existing book actually opens.",
  },
  {
    icon: QrCode,
    title: "QR signs & embeds",
    description:
      "QR codes on yard signs, a 2-line widget on your IDX site, or a co-branded microsite on your own subdomain.",
  },
  {
    icon: Award,
    title: "You look like the expert",
    description:
      "Every report makes you the local market authority — with comps, cash flow, and a 5-year forecast doing the talking.",
  },
];

export function ForPartners() {
  return (
    <section id="partners" className="bg-[#0d1626] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl space-y-4 text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
            Partner / White-Label Program
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-cream text-balance sm:text-4xl lg:text-5xl">
            Put your brand on every report
          </h2>
          <p className="mx-auto max-w-xl text-lg text-cream/60">
            Agents, brokerages, title companies &amp; mortgage shops deploy this
            as their own branded lead magnet. Your clients run the numbers — and
            call you.
          </p>
        </motion.div>

        {/* Value cards */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnerCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-card p-6 transition hover:border-gold/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/20 text-forest transition group-hover:bg-gold/15 group-hover:text-gold">
                <card.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-cream">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-3 text-center"
        >
          <a
            href={PARTNER_MAILTO}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:brightness-110"
          >
            Become a launch partner <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-xs text-cream/40">
            White-label setup in under 24 hours · co-branded domain · deal
            attribution built in.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
