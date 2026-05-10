# V0.DEV PROMPT — AI Real Estate Analyst Landing Page
**Date:** 2026-05-09 · **Stack:** Next.js 15 + TypeScript + Tailwind + shadcn/ui + Aceternity + Magic UI

---

## ⚠️ WHY V0.DEV SAID "NOT A JS/TS PROJECT"

The repo at `ai-realestate-claude` is a **Python-based Claude Code skill collection** (install.sh, .py scripts, .md skill files). It contains zero JavaScript/TypeScript, so v0 correctly detected it as non-JS. The fix: **the prompt below explicitly tells v0 to scaffold a NEW Next.js 15 + TypeScript project from zero in a fresh subdirectory** (`/web` or `/landing`), alongside the existing Python tooling. v0 will create all required config files (package.json, tsconfig, tailwind, next.config) so the preview deploy will then work.

**TL;DR for v0:** Ignore the Python files. Create a fresh Next.js 15 app in `/web/`. Open a PR with the full scaffold + landing page + all dependencies installed.

---

## STRATEGIC VERDICT (What We're Actually Building)

The 4 dept heads triangulated on a hybrid play:

- **Hero / Traffic angle** (Marketing): Mass-consumer viral hook → "Type any address. Get the score your agent never shows you."
- **Monetization wedge** (Crawford GTM): Wholesalers + agents pay-per-deal ($39/report) — they have urgency and budget
- **Product gap** (Research): Cross-strategy synthesis (rental + flip + STR + BRRRR in one shot) → no competitor does this
- **Unfair advantage**: 5 parallel AI agents in <60 sec + client-ready PDF (no subscription wall on first hit)

**The funnel:**
```
Curious browser (consumer hook)
    ↓ enters address
Property Score 0-100 + grade letter (FREE, no email)
    ↓ "Want the full PDF?"
Email capture → 6-page PDF report (FREE, captures the lead)
    ↓ "Run another?"
Tier 1: $39/report (wholesalers, no commitment)
Tier 2: $79/mo Pro (unlimited + API + PDF white-label)
Tier 3: $199/mo Agency (5 seats + webhooks)
```

---

## ====================================================================
## PASTE EVERYTHING BELOW THIS LINE INTO V0.DEV
## ====================================================================

```
README FOR V0:

This GitHub repo (ai-realestate-claude) is a Python-based Claude Code skill collection — that's why you saw "not a JS/TS project". You will NOT modify any existing files. Instead, scaffold a brand-new Next.js 15 + TypeScript App Router project in a new subdirectory called `web/` at the repo root, with all required config files so the preview deployment works.

When you open the PR, include ALL of these files so the project becomes a valid JS/TS workspace:
- web/package.json (with all dependencies and "build", "dev", "start", "lint" scripts)
- web/tsconfig.json (Next.js 15 strict TS config, paths alias @/*)
- web/next.config.mjs (default Next 15 config)
- web/tailwind.config.ts (with custom CSS vars for the color palette)
- web/postcss.config.mjs
- web/.gitignore (node_modules, .next, .env*.local)
- web/.eslintrc.json (next/core-web-vitals)
- web/components.json (shadcn config, style: new-york, RSC: true, tailwind: { baseColor: slate })
- web/app/layout.tsx (root layout with Geist Sans + Geist Mono via next/font/google, ThemeProvider wrapper)
- web/app/page.tsx (the landing page composing all sections)
- web/app/globals.css (Tailwind directives + CSS vars for navy/forest/gold palette + dark mode tokens)
- web/components/sections/{Hero,SocialProof,LiveDemo,ScoreBreakdown,UseCases,PdfPreview,Pricing,Faq,Footer}.tsx
- web/components/ui/* (shadcn primitives needed)
- web/components/aceternity/* (Spotlight, BackgroundBeams, BentoGrid, HeroParallax, MovingBorder, Meteors, Sparkles, AnimatedTooltip)
- web/components/magicui/* (NumberTicker, BorderBeam, ShimmerButton, Marquee, AnimatedGridPattern, Confetti)
- web/components/theme-provider.tsx (next-themes wrapper)
- web/lib/utils.ts (cn helper)
- web/README.md (cd web && npm install && npm run dev)

REQUIRED package.json dependencies:
  "next": "^15.0.0", "react": "^19.0.0", "react-dom": "^19.0.0", "typescript": "^5",
  "tailwindcss": "^3.4", "tailwindcss-animate": "latest", "tailwind-merge": "latest",
  "clsx": "latest", "class-variance-authority": "latest",
  "@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-tabs",
  "@radix-ui/react-tooltip", "@radix-ui/react-progress", "@radix-ui/react-hover-card",
  "@radix-ui/react-slot", "@radix-ui/react-separator", "@radix-ui/react-label",
  "@radix-ui/react-select",
  "framer-motion": "latest", "motion": "latest",
  "lucide-react": "latest", "next-themes": "latest",
  "recharts": "latest", "cmdk": "latest",
  "canvas-confetti": "latest", "@types/canvas-confetti": "latest",
  "geist": "latest"

DevDependencies: "@types/node", "@types/react", "@types/react-dom", "eslint", "eslint-config-next", "postcss", "autoprefixer".

After scaffolding, the user will run: `cd web && npm install && npm run dev`. The preview deployment will then work because there's now a valid package.json at web/package.json (configure root in Vercel project settings as `web/`).

==============================================================
NOW BUILD THE LANDING PAGE
==============================================================

Build a stunning full-page Next.js 15 + React + TypeScript + Tailwind + shadcn/ui landing page at web/app/page.tsx for "AI Real Estate Analyst" — an AI tool that scores any US property address 0–100 and gives an A+ to F letter grade with a Buy/Hold/Pass signal in under 60 seconds.

POSITIONING: "Zillow tells you what it sold for. We tell you if you should buy it." Headline framing is for curious house-hunters and investors who suspect they're being played. The free address lookup is the viral hook.

COLOR PALETTE (set as CSS vars in web/app/globals.css):
  --navy: #1a2332 (dark bg)
  --forest: #2d8a4e (primary accent)
  --gold: #c9982e (highlight/CTA)
  --cream: #f8f6f1 (light sections)
Dark mode is default; respect system preference via next-themes.

FONTS: Geist Sans for all UI text, Geist Mono for score numbers and address input. Import from `geist/font/sans` and `geist/font/mono` in app/layout.tsx.

COMPONENT STACK TO USE:
- shadcn/ui (install via `npx shadcn@latest add`): Command, CommandInput, Dialog, Sheet, Tabs, TabsContent, Card, CardContent, Badge, Progress, HoverCard, HoverCardContent, Accordion, AccordionItem, Separator, Skeleton, Tooltip, Button, Input, Label, Select
- Aceternity UI (drop component code directly into web/components/aceternity/): Spotlight (hero), BackgroundBeams (demo section), BentoGrid + BentoGridItem (use cases), HeroParallax (PDF preview), MovingBorder (primary CTA + Pro pricing CTA), Meteors (Pro pricing card interior), Sparkles (grade badge), AnimatedTooltip (social proof avatars)
- Magic UI (drop component code directly into web/components/magicui/): NumberTicker (score counter animation), BorderBeam (analyzer card), ShimmerButton (secondary CTAs), Marquee (logo bar), AnimatedGridPattern (hero background layer), Confetti (canvas-confetti, fires on score reveal ≥ 80)
- Recharts: RadialBarChart with 5 rings for score breakdown (Comps 25% navy, Income 20% forest-green, Neighborhood 20% warm-gold, Investment 20% slate, Market 15% muted-green)
- Framer Motion: section entrance animations (fadeInUp, staggerChildren), score card flip (rotateY 0→180), tab content slide, annual/monthly pricing toggle spring
- lucide-react: MapPin, TrendingUp, Home, DollarSign, BarChart3, FileText, Star, Shield, Zap, Activity, Check

SECTION 1 — HERO (web/components/sections/Hero.tsx — full viewport, dark navy, overflow hidden):
- Aceternity Spotlight: 3 beams, bottom-center, tinted green + gold
- AnimatedGridPattern behind at 8% opacity
- Left column (60% width on desktop):
  - Small badge: green dot + "Now in Beta · 14 Analysis Modes"
  - H1 (text-5xl lg:text-7xl font-bold tracking-tight): "Type any address. Get the score your agent never shows you."
  - Sub (text-xl text-muted-foreground max-w-lg): "5 AI agents analyze any US property in 60 seconds. Comps, rental cash flow, BRRRR model, flip ROI, neighborhood score — plus a 6-page PDF you can hand to your buyer or contractor."
  - CTA row: MovingBorder Button primary (gold bg) "Score My Property →" scrolls to #demo; ShimmerButton ghost "See Sample Report"
  - Trust line: "Free · No signup · Results in 60 seconds"
- Right column (40% width on desktop):
  - Animated mockup card (rounded-2xl border bg-card shadow-2xl) with BorderBeam:
    - Address input showing "1234 Maple Street, Austin TX 78701"
    - Progress bar animating green
    - Score card reveals: NumberTicker 0→84 in Geist Mono text-8xl, badge "B+" wrapped in Sparkles gold, green chip "BUY SIGNAL"
    - 5 mini Progress bars: Comps 88, Income 76, Neighborhood 82, Investment 79, Market 71

SECTION 2 — SOCIAL PROOF BAR (web/components/sections/SocialProof.tsx — py-6 dark navy slightly lighter):
- Left: AnimatedTooltip showing 5 avatar images (use placeholder URLs from i.pravatar.cc) with names, text "3,400+ investors, agents, and wholesalers"
- Right: Marquee (speed 30, pauseOnHover) with text wordmarks (Zillow, Realtor.com, RentCast, PropStream, BatchLeads, BiggerPockets) — render as styled text spans separated by vertical dividers (avoid SVG dependencies on third-party logos)

SECTION 3 — LIVE DEMO WIDGET (web/components/sections/LiveDemo.tsx — id="demo", full-width, BackgroundBeams behind, py-24):
- H2 centered: "Try It Live — Enter Any US Address"
- Sub: "Real data. Real scores. No signup required for your first 3 analyses."
- Center card max-w-2xl mx-auto, BorderBeam, rounded-2xl:
  - shadcn Command component styled as large address search bar (h-14 text-lg)
  - CommandInput placeholder: "123 Main St, City, State ZIP..."
  - Submit button (gold): "Get My Score →"
  - On submit state (use useState): show Skeleton pulse 2s then flip card (Framer Motion AnimatePresence + rotateY) revealing:
    - Top: address shown in Geist Mono text-sm muted
    - Large score: NumberTicker to 84, Geist Mono text-9xl text-green-400
    - Grade badge "B+" with Sparkles, signal badge green "BUY"
    - 5 category Progress bars with labels and percentage values
    - Button: "Email Me the Full PDF Report" (ShimmerButton gold) — opens Dialog with email capture (just an Input + Button, no backend yet — toast a thank-you)
  - Fire Confetti when score ≥ 80

SECTION 4 — SCORE BREAKDOWN (web/components/sections/ScoreBreakdown.tsx — py-24 bg-cream dark:bg-slate-900):
- H2: "Five-Factor Scoring Model — Built by Real Estate Analysts, Not a Spreadsheet"
- Sub: "We don't just give you a number. We tell you which strategy wins — buy and hold, BRRRR, flip, or pass."
- Two-column layout:
  - Left: Recharts RadialBarChart 400×400, 5 bars, innerRadius 40 outerRadius 160. Clockwise from outer: Comps (#1a2332 25%), Income (#2d8a4e 20%), Neighborhood (#c9982e 20%), Investment (#4a6fa5 20%), Market (#5a9a6e 15%). Center label shows "84 / B+"
  - Right: 5 shadcn HoverCard items stacked. Each: category name + weight chip + one-line description. Hover reveals: methodology, data source, example score interpretation. Use lucide icons: BarChart3, DollarSign, MapPin, TrendingUp, Activity

SECTION 5 — USE CASES TABS (web/components/sections/UseCases.tsx — py-24 dark navy):
- H2: "Built for Every Real Estate Professional"
- shadcn Tabs, 4 tabs: Investor / Agent / House Hunter / Wholesaler
- Each TabsContent: Aceternity BentoGrid 2-col, 4 BentoGridItems
  - Investor: BRRRR Model (full-col), Flip ROI Calculator, Cap Rate Analysis, Cash Flow Projections
  - Agent: MLS Listing Writer (full-col), CMA Comps Report, Buyer Score Summary, Shareable PDF
  - House Hunter: Neighborhood Score (full-col), School District Data, 30-Year Mortgage Calc, Move-In Checklist
  - Wholesaler: ARV in 60 Seconds (full-col), MAO Formula Calculator, Side-by-Side Compare, Buyer-Ready PDF
- Each BentoGridItem: lucide icon, bold title, 2-line description, green feature tag chips

SECTION 6 — PDF PREVIEW (web/components/sections/PdfPreview.tsx — py-24 bg-slate-950):
- H2: "A 6-Page Report That Closes Deals"
- Sub: "Every analysis generates a branded PDF with comps map, cash flow waterfall, neighborhood heatmap, and investment scenarios. Hand it to your buyer, your contractor, or your lender."
- Aceternity HeroParallax fed 6 placeholder gradient cards labeled with page titles: Cover + Score, Comparable Sales Map, Rental Cash Flow, Neighborhood Analysis, BRRRR / Flip Model, Mortgage Calculator (use Tailwind gradient bg-gradient-to-br with the navy/forest/gold palette)
- Below parallax: centered ShimmerButton "Download Sample Report (PDF)"

SECTION 7 — PRICING (web/components/sections/Pricing.tsx — py-24 dark navy):
- H2: "Simple Pricing — Pay Per Deal or Go Unlimited"
- Annual/monthly toggle: Framer Motion spring (use shadcn Switch), shows "Save 20%" badge when annual selected
- 3-column grid gap-6 max-w-5xl mx-auto:
  - Per-Deal: $39/report, "Run one address. Get the full PDF. No subscription.", features list (5 items), Button ghost "Run a Deal"
  - Pro (featured, border-gold): $79/mo badge "Most Popular" gold, "Unlimited reports + PDF export + API access + saved portfolios", Meteors inside card, features list (12 items), MovingBorder Button gold "Start Free Trial"
  - Agency: $199/mo, "White-label PDFs + 5 seats + webhooks + priority support", features list (10 items), Button ghost "Contact Sales"
- All cards: shadcn Card, lucide Check icons green for features, Badge for limits

SECTION 8 — FAQ (web/components/sections/Faq.tsx — py-20 bg-slate-900):
- H2: "Frequently Asked Questions"
- shadcn Accordion type="single" collapsible, max-w-3xl mx-auto, 8 items:
  1. How accurate are the property scores?
  2. What data sources do you use?
  3. Which US states are supported?
  4. Can I access data via API?
  5. How often is data updated?
  6. Can I customize the PDF branding?
  7. Do you offer team or agency plans?
  8. What is your refund policy?

SECTION 9 — FOOTER (web/components/sections/Footer.tsx — bg-navy border-t border-white/10):
- Logo + tagline left
- 3-col nav: Product (Analyzer, PDF Reports, API, Pricing), Resources (Sample Report, Blog, Docs), Company (About, Privacy, Terms)
- Social icons: Twitter/X, GitHub — lucide icons
- Bottom bar: "Powered by RentCast · Zillow API · US Census Bureau · © 2026 AI Real Estate Analyst"

RESPONSIVE: Mobile-first. Hero stacks to single column on mobile, mockup card below text. Tabs scroll horizontally on mobile. BentoGrid goes 1-col on mobile. Pricing cards stack vertically. All touch targets min 44px.

ANIMATIONS: All sections use Framer Motion whileInView with fadeInUp (y: 40 → 0, opacity 0 → 1, duration 0.6) and staggerChildren 0.1s. Score card uses AnimatePresence for flip state. Pricing toggle uses layout animation.

TYPESCRIPT: All components must be properly typed. Use `"use client"` directive on any component that uses hooks, state, or browser APIs (which is most of them). The app/page.tsx and app/layout.tsx can be server components.

NO BACKEND CALLS YET: All data is hardcoded for the demo. The Email capture Dialog just toasts a thank-you. The "Download PDF" button does nothing yet. We'll wire APIs after preview deploy is green.

DELIVERABLE: A single PR that:
1. Creates the entire web/ directory with all configs and components
2. The PR description includes the run commands: `cd web && npm install && npm run dev`
3. The PR description tells the user to set Vercel project root to `web/` for preview deployments to work

Make all placeholder copy exact as specified above. Use realistic-looking placeholder data for the demo widget (hardcode address "1234 Maple Street, Austin TX 78701", score 84, grade B+).
```

## ====================================================================
## END OF V0.DEV PROMPT — STOP COPYING HERE
## ====================================================================

---

## POST-V0 CHECKLIST

After v0 opens the PR:

1. **Merge the PR** (or check it out locally)
2. **Set Vercel root directory** to `web/` (Project Settings → General → Root Directory)
3. **Trigger a redeploy** — preview deployment will now succeed
4. **Run locally**: `cd web && npm install && npm run dev` → http://localhost:3000
5. **Wire the backend** (Phase 2):
   - `web/app/api/analyze/route.ts` → calls Python skill chain via subprocess or HTTP bridge
   - `web/app/api/pdf/route.ts` → pipes `realestate-report-pdf` skill output
   - Add Clerk auth (free 3-report quota tracked in Supabase)
   - Replace hardcoded demo data with real API calls (SWR or React Query)

---

## TRAFFIC PLAYS (Post-Launch, Ranked)

1. **SEO teardown pages** — "Is [Famous Address] a Good Investment?" celebrity homes, viral flips → each is a sharable social asset + long-tail SEO
2. **Wholesaler outbound** (Crawford PVP) — Monitor BiggerPockets/FB groups for "got a property under contract" posts → permissionless ARV report DM
3. **Agent partnership** — White-label PDF as a closing-table giveaway. Agents become distribution.
4. **Paid Meta** — "Zillow trap" creative angle, target Zillow-app users, $8-12 CPL projected
5. **STG cross-pollination** — Share architecture pattern with Roofing GTM (5-agent fan-out + composite score = blueprint for `/roofing audit`)
