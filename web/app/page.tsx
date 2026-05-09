import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { ScoreBreakdown } from "@/components/sections/ScoreBreakdown";
import { UseCases } from "@/components/sections/UseCases";
import { PdfPreview } from "@/components/sections/PdfPreview";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <LiveDemo />
      <ScoreBreakdown />
      <UseCases />
      <PdfPreview />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
