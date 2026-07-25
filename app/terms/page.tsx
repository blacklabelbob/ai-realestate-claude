import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | AI Real Estate Analyst",
  description:
    "The terms governing your use of the AI Real Estate Analyst service.",
};

const LAST_UPDATED = "June 1, 2026";

export default function TermsPage() {
  return (
    <main className="bg-navy">
      <Nav />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="border-b border-white/10 pb-8">
          <Link
            href="/"
            className="text-sm text-cream/50 transition hover:text-cream"
          >
            ← Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-cream/50">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="mt-10 space-y-8 text-cream/70 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-cream [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <section>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
              and use of the AI Real Estate Analyst website and property-analysis
              service (the &ldquo;Service&rdquo;). By using the Service, you agree
              to these Terms. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2>1. Educational Use Only — Not Investment or Financial Advice</h2>
            <p>
              The Service produces analytical estimates, scores, and projections
              for informational and educational purposes only. It is{" "}
              <strong>
                not investment advice, financial advice, legal advice, an
                appraisal, or a real-estate brokerage service
              </strong>
              , and it must not be relied upon as the sole basis for any purchase,
              sale, financing, or investment decision. Always consult a licensed
              real-estate professional, appraiser, attorney, and/or financial
              advisor before acting.
            </p>
          </section>

          <section>
            <h2>2. Data Sources &amp; Accuracy</h2>
            <p>
              Reports are generated from publicly available and licensed data
              (including sources such as Redfin, Zillow, FRED, the U.S. Census
              Bureau, GreatSchools, and county records). This data may be
              incomplete, delayed, or inaccurate, and our models produce estimates
              — not guarantees. We do not warrant the accuracy, completeness, or
              timeliness of any output.
            </p>
          </section>

          <section>
            <h2>3. The Service Is Provided &ldquo;AS IS&rdquo;</h2>
            <p>
              The Service and all reports are provided on an &ldquo;AS IS&rdquo;
              and &ldquo;AS AVAILABLE&rdquo; basis, without warranties of any kind,
              whether express or implied, including but not limited to implied
              warranties of merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </section>

          <section>
            <h2>4. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, AI Real Estate Analyst and
              its affiliates will not be liable for any indirect, incidental,
              consequential, special, or punitive damages, or for any loss of
              profits, data, or goodwill, arising out of or related to your use of
              (or inability to use) the Service or any reliance on its output.
            </p>
          </section>

          <section>
            <h2>5. Acceptable Use</h2>
            <ul>
              <li>
                Do not use the Service for any unlawful, infringing, or abusive
                purpose.
              </li>
              <li>
                Do not attempt to scrape, reverse-engineer, overload, or disrupt
                the Service or its underlying systems.
              </li>
              <li>
                Do not resell, redistribute, or republish reports except as
                expressly permitted under a paid or white-label plan.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Plans, Payment &amp; Refunds</h2>
            <p>
              Paid plans are billed as described at the point of purchase.
              Per-report purchases are non-refundable once a report is generated.
              Subscription terms, including any money-back window, are presented at
              checkout and govern those purchases.
            </p>
          </section>

          <section>
            <h2>7. Intellectual Property</h2>
            <p>
              The Service, including its software, design, and brand, is owned by
              us and protected by applicable law. You retain rights to the
              addresses and contact details you submit; you grant us a limited
              license to process them to provide the Service.
            </p>
          </section>

          <section>
            <h2>8. Changes &amp; Termination</h2>
            <p>
              We may modify, suspend, or discontinue the Service or update these
              Terms at any time. Continued use after changes take effect
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              Questions about these Terms? Email us at{" "}
              <a
                href="mailto:rob@aivoicetech.io"
                className="text-gold underline decoration-dotted underline-offset-2 hover:text-gold/80"
              >
                rob@aivoicetech.io
              </a>
              .
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
