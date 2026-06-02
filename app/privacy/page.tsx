import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | AI Real Estate Analyst",
  description:
    "How AI Real Estate Analyst collects, uses, and protects your information.",
};

const LAST_UPDATED = "June 1, 2026";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-cream/50">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="prose-invert mt-10 space-y-8 text-cream/70 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-cream [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <section>
            <p>
              This Privacy Policy explains how AI Real Estate Analyst (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and safeguards
              information when you use our website and property-analysis service
              (the &ldquo;Service&rdquo;). By using the Service, you agree to the
              practices described here.
            </p>
          </section>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We keep data collection deliberately minimal:</p>
            <ul>
              <li>
                <strong>Contact details you provide.</strong> When you request a
                report, we capture your name and email address so we can deliver
                that report to you.
              </li>
              <li>
                <strong>Property addresses you submit.</strong> We process the
                addresses you enter to generate an analysis.
              </li>
              <li>
                <strong>Basic usage data.</strong> Standard, aggregated analytics
                (such as pages viewed and device type) used to operate and improve
                the Service.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Data Sources</h2>
            <p>
              Our analyses are built on publicly available and licensed data —
              including sources such as Redfin, Zillow, FRED, the U.S. Census
              Bureau, GreatSchools, and county assessor and public records. We do
              not purchase or assemble private personal profiles about you to
              generate a report.
            </p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To generate and deliver the property reports you request.</li>
              <li>To send the report and related follow-up about the Service.</li>
              <li>To operate, secure, maintain, and improve the Service.</li>
            </ul>
          </section>

          <section>
            <h2>4. We Do Not Sell Your Personal Data</h2>
            <p>
              We do not sell, rent, or trade your personal information to third
              parties. We share data only with service providers who help us
              operate the Service (for example, email delivery and hosting), and
              only as needed to perform those functions on our behalf.
            </p>
          </section>

          <section>
            <h2>5. Data Retention &amp; Security</h2>
            <p>
              We retain the information you provide for as long as needed to
              deliver the Service and meet legal obligations, and we apply
              reasonable technical and organizational measures to protect it. No
              method of transmission or storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>6. Your Choices</h2>
            <p>
              You may request access to, correction of, or deletion of the
              personal information we hold about you, and you can opt out of
              non-essential emails at any time. To make a request, contact us
              using the details below.
            </p>
          </section>

          <section>
            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes
              will be reflected by updating the &ldquo;Last updated&rdquo; date
              above.
            </p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a
                href="mailto:rob@boostuppayments.com"
                className="text-gold underline decoration-dotted underline-offset-2 hover:text-gold/80"
              >
                rob@boostuppayments.com
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
