import { ThemeProvider } from '@/contexts/ThemeContext';
import Ticker from '@/components/Ticker';
import { lazy, Suspense } from 'react';

const Hero = lazy(() => import('@/components/Hero'));
const DorSection = lazy(() => import('@/components/DorSection'));
const ProblemaSection = lazy(() => import('@/components/ProblemaSection'));
const SolucaoSection = lazy(() => import('@/components/SolucaoSection'));
const AutoridadeSection = lazy(() => import('@/components/AutoridadeSection'));
const TestemunhosSection = lazy(() => import('@/components/TestemunhosSection'));
const OfertaSection = lazy(() => import('@/components/OfertaSection'));
const GarantiaSection = lazy(() => import('@/components/GarantiaSection'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const Footer = lazy(() => import('@/components/Footer'));
const StickyBar = lazy(() => import('@/components/StickyBar'));
const SectionSeparator = lazy(() => import('@/components/SectionSeparator'));

const tickerTop = [
  'ERRO DE SOFTWARE MENTAL',
  'OCLUSÃO COGNITIVA',
  'FADIGA DE DECISÃO',
  'DESTRAVE A PORTA NEURAL',
  'RECUPERE O GOVERNO',
];

const tickerMid = [
  'IDENTIFIQUE A TRAVA',
  'DESMONTE A AUTOSSABOTAGEM',
  'RECUPERE O GOVERNO DO SEU SISTEMA',
];

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: '#000005' }}>
        <Ticker items={tickerTop} />
        <Suspense fallback={<div className="h-screen bg-[#000005]" />}>
          <Hero />
          <SectionSeparator />
          <DorSection />
          <SectionSeparator />
          <Ticker items={tickerMid} />
          <SectionSeparator />
          <ProblemaSection />
          <SectionSeparator />
          <SolucaoSection />
          <SectionSeparator />
          <AutoridadeSection />
          <SectionSeparator />
          <TestemunhosSection />
          <SectionSeparator />
          <OfertaSection />
          <SectionSeparator />
          <GarantiaSection />
          <SectionSeparator />
          <FAQSection />
          <SectionSeparator />
          <Footer />
          <StickyBar />
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default Index;
