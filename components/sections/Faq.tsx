"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate are the property scores?",
    answer:
      "Our scores are based on real-time data from multiple sources including MLS listings, county records, and rental databases. We achieve 90%+ accuracy on comparable sales and 85%+ on rental income estimates. Each score includes a confidence interval so you know when to dig deeper.",
  },
  {
    question: "What data sources do you use?",
    answer:
      "We aggregate data from Zillow, Realtor.com, RentCast, US Census Bureau, GreatSchools, Walk Score, and county assessor records. Our AI cross-references multiple sources to validate accuracy and flag discrepancies.",
  },
  {
    question: "Which US states are supported?",
    answer:
      "We currently support all 50 US states. Coverage is strongest in major metro areas with the most MLS and rental data. Rural areas may have limited comparable sales data, which we disclose in the confidence score.",
  },
  {
    question: "Can I access data via API?",
    answer:
      "Yes! Pro and Agency plans include API access. The Pro plan includes 1,000 API calls per month, while Agency plans have customizable limits. Our REST API returns JSON with all scoring factors, comps, and rental estimates.",
  },
  {
    question: "How often is data updated?",
    answer:
      "MLS and listing data is refreshed daily. Rental estimates update weekly. Neighborhood scores and census data update quarterly. Market trend indicators update in real-time based on new listings and closings.",
  },
  {
    question: "Can I customize the PDF branding?",
    answer:
      "Pro plans can add a custom logo and color scheme. Agency plans get full white-label capability including custom domains, footer text, and complete branding removal of our logo.",
  },
  {
    question: "Do you offer team or agency plans?",
    answer:
      "Yes! Our Agency plan includes 5 team seats with role-based permissions. Need more seats? Contact us for custom enterprise pricing with SSO, dedicated support, and SLA guarantees.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Per-Deal purchases are non-refundable once the report is generated. Pro and Agency subscriptions offer a 14-day money-back guarantee. Cancel anytime and your access continues through the billing period.",
  },
];

export function Faq() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream text-balance">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 data-[state=open]:border-forest/50"
              >
                <AccordionTrigger className="text-left text-cream hover:text-forest hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
