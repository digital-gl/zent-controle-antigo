import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBand from "@/components/MarqueeBand";
import SectionSeparator from "@/components/SectionSeparator";

const PainSection = lazy(() => import("@/components/PainSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const RevenueSourcesSection = lazy(() => import("@/components/RevenueSourcesSection"));
const GoldenCardSection = lazy(() => import("@/components/GoldenCardSection"));
const InvestmentCalculator = lazy(() => import("@/components/InvestmentCalculator"));
const ResultadosSection = lazy(() => import("@/components/ResultadosSection"));
const ParaQuemSection = lazy(() => import("@/components/ParaQuemSection"));
const MetodologiaSection = lazy(() => import("@/components/MetodologiaSection"));
const AutoridadeSection = lazy(() => import("@/components/AutoridadeSection"));
const DepoimentosSection = lazy(() => import("@/components/DepoimentosSection"));
const OfertaSection = lazy(() => import("@/components/OfertaSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));


const MARQUEE_1 = [
  "💰 5% AO MÊS",
  "📈 OPERAÇÕES FOREX",
  "🦅 THE W CONSULTORIA",
  "💵 GANHOS EM DÓLAR",
  "🏦 CNPJ ATIVO",
  "🤝 PARCERIAS ESTRATÉGICAS",
  "📚 ESCOLA DE TRADER",
  "⭐ DESDE 2021",
  "🔒 CONTRATO DE 24 MESES",
];

const MARQUEE_2 = [
  "✅ CONTRATO FORMAL",
  "✅ EMPRESA REGISTRADA",
  "✅ CNPJ 66.800.082/0001-67",
  "✅ OPERAÇÕES REAIS",
  "✅ 4 FONTES DE RECEITA",
  "✅ SUPORTE ATIVO",
  "✅ PROGRAMA DE INDICAÇÃO",
  "✅ RENOVAÇÃO AUTOMÁTICA",
];

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "#000005" }}>
      <Navbar />
      <Hero />
      <MarqueeBand items={MARQUEE_1} direction="left" />
      <Suspense fallback={<div className="h-32" />}>
        <PainSection />
        <MarqueeBand items={MARQUEE_2} direction="right" />
        <SectionSeparator />
        <HowItWorksSection />
        <SectionSeparator />
        <RevenueSourcesSection />
        <SectionSeparator />
        <GoldenCardSection />
        <SectionSeparator />
        <InvestmentCalculator />
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
