import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionSeparator from "@/components/SectionSeparator";

const ResultadosSection = lazy(() => import("@/components/ResultadosSection"));
const ParaQuemSection = lazy(() => import("@/components/ParaQuemSection"));
const MetodologiaSection = lazy(() => import("@/components/MetodologiaSection"));
const AutoridadeSection = lazy(() => import("@/components/AutoridadeSection"));
const DepoimentosSection = lazy(() => import("@/components/DepoimentosSection"));
const OfertaSection = lazy(() => import("@/components/OfertaSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "#000005" }}>
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="h-32" />}>
        <SectionSeparator />
        <ResultadosSection />
        <SectionSeparator />
        <ParaQuemSection />
        <SectionSeparator />
        <MetodologiaSection />
        <SectionSeparator />
        <AutoridadeSection />
        <SectionSeparator />
        <DepoimentosSection />
        <SectionSeparator />
        <OfertaSection />
        <SectionSeparator />
        <FAQSection />
        <SectionSeparator />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
