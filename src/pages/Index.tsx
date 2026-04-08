import { ThemeProvider } from '@/contexts/ThemeContext';
import Ticker from '@/components/Ticker';
import Hero from '@/components/Hero';
import DorSection from '@/components/DorSection';
import ProblemaSection from '@/components/ProblemaSection';
import SolucaoSection from '@/components/SolucaoSection';
import AutoridadeSection from '@/components/AutoridadeSection';
import TestemunhosSection from '@/components/TestemunhosSection';
import OfertaSection from '@/components/OfertaSection';
import GarantiaSection from '@/components/GarantiaSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import StickyBar from '@/components/StickyBar';
import SectionSeparator from '@/components/SectionSeparator';

const tickerTop = [
  'ERRO DE HARDWARE MENTAL',
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
      <div className="min-h-screen" style={{ background: '#040D2E' }}>
        <Ticker items={tickerTop} />
        <Hero />
        <SectionSeparator />
        <DorSection />
        <SolucaoSection />
        <SectionSeparator />
        <Ticker items={tickerMid} />
        <SectionSeparator />
        <ProblemaSection />
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
      </div>
    </ThemeProvider>
  );
};

export default Index;
