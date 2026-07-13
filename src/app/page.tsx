
import CategoriesSection from "@/components/CategoriesSection";
import { CTASection } from "@/components/CtaSection";
import { FAQSection } from "@/components/FaqSection";
import Hero from "@/components/Hero";
import { HighlightsSection } from "@/components/HighlightsSection";
import LatestGadget from "@/components/LatestGadget";
import Stats from "@/components/Stats";
import { TestimonialsSection } from "@/components/TestimonialsSection";


export default function Home() {
  return (
    <>

      <Hero />
      <LatestGadget />
      <Stats/>
      <CategoriesSection />
      <HighlightsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>

  );
}
