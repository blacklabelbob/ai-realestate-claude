import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Real Estate Analyst | Property Scores in 60 Seconds",
  description:
    "Type any US address. Get a 0-100 property score with Buy/Hold/Pass signals. 5 AI agents analyze comps, rental cash flow, BRRRR model, flip ROI, and neighborhood data in under 60 seconds.",
  keywords: [
    "real estate analysis",
    "property score",
    "investment property",
    "BRRRR calculator",
    "rental income",
    "house flip ROI",
    "AI real estate",
  ],
  authors: [{ name: "AI Real Estate Analyst" }],
  openGraph: {
    title: "AI Real Estate Analyst | Property Scores in 60 Seconds",
    description:
      "Zillow tells you what it sold for. We tell you if you should buy it.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2332" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
