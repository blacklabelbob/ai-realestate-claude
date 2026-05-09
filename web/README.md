# AI Real Estate Analyst - Landing Page

A stunning Next.js 15 landing page for AI Real Estate Analyst - an AI-powered tool that scores any US property address 0-100 with a Buy/Hold/Pass signal in under 60 seconds.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **Components:** shadcn/ui, Aceternity UI, Magic UI
- **Animation:** Framer Motion
- **Charts:** Recharts

## Getting Started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
web/
├── app/
│   ├── globals.css      # Tailwind + CSS variables (navy/forest/gold palette)
│   ├── layout.tsx       # Root layout with fonts and theme provider
│   └── page.tsx         # Main landing page
├── components/
│   ├── aceternity/      # Aceternity UI components
│   ├── magicui/         # Magic UI components
│   ├── sections/        # Page sections (Hero, Pricing, etc.)
│   ├── ui/              # shadcn/ui primitives
│   └── theme-provider.tsx
└── lib/
    └── utils.ts         # cn() helper
```

## Vercel Deployment

Set the **Root Directory** to `web/` in your Vercel project settings for deployments to work correctly.

## Color Palette

| Color  | Value     | Usage           |
| ------ | --------- | --------------- |
| Navy   | `#1a2332` | Dark background |
| Forest | `#2d8a4e` | Primary accent  |
| Gold   | `#c9982e` | CTA / Highlight |
| Cream  | `#f8f6f1` | Light sections  |

## Features

- Responsive design (mobile-first)
- Dark mode by default with system preference support
- Animated components with Framer Motion
- Interactive live demo widget
- Pricing toggle (monthly/annual)
- FAQ accordion
- Social proof with avatar tooltips
