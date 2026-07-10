import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/site/Loader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ScrollServices } from "@/components/site/ScrollServices";
import { Modules } from "@/components/site/Modules";
import { WhySkyERP, AISection } from "@/components/site/WhyAndAI";
import { Industries } from "@/components/site/Industries";
import { Integrations } from "@/components/site/Integrations";
import {
  Testimonials,
  ROICalculator,
  Pricing,
  FAQ,
} from "@/components/site/Marketing";
import { LetsWorkTransition } from "@/components/site/LetsWorkTransition";
import { Footer } from "@/components/site/Footer";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkyERP — AI-native ERP for finance, ops, manufacturing & HR" },
      {
        name: "description",
        content:
          "One integrated ERP with SkyAI copilots. Finance, manufacturing, inventory, CRM, HR & projects on a single cloud platform. Trusted by 4,200+ global teams.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ScrollServices />
        <WhySkyERP />
        <Modules />
        <AISection />
        <Industries />
        <Integrations />
        <Testimonials />
        <ROICalculator />
        <Pricing />
        <FAQ />
        <LetsWorkTransition />
      </main>
      <Footer />
     
    </>
  );
}
