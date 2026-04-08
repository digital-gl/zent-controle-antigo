import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeSelector from '@/components/ThemeSelector';
import Ticker from '@/components/Ticker';
import Hero from '@/components/Hero';
import DorSection from '@/components/DorSection';
import ProblemaSection from '@/components/ProblemaSection';
import ProdutoSection from '@/components/ProdutoSection';
import AutoridadeSection from '@/components/AutoridadeSection';
import TestemunhosSection from '@/components/TestemunhosSection';
import OfertaSection from '@/components/OfertaSection';
import GarantiaSection from '@/components/GarantiaSection';
import { FAQSection } from '@/components/FAQSection';
import CTAFinalSection from '@/components/CTAFinalSection';
import { Footer } from '@/components/Footer';
import StickyBar from '@/components/StickyBar';
import SectionSeparator from '@/components/SectionSeparator';

const tickerTop = [
  'Diagnóstico da Porta Neural',
  'Por que você trava mesmo tentando mudar?',
  'Empresários que já fizeram tudo certo... e ainda assim colapsaram',
  'Seu problema não é falta de esforço',
  'Descubra o que está bloqueando sua mente',
  'R$ 49 · Acesso Imediato',
  'Diagnóstico da Porta Neural',
];

const tickerMid = [
  'A Porta Neural está fechada desde que você não sabe',
  'Traumas não resolvidos bloqueiam decisões que você tenta tomar hoje',
  'Clareza não volta com mais esforço. Volta quando a porta abre',
  'Você não está fraco. Está carregando mais do que deveria sozinho',
  'O ciclo se repete porque a raiz nunca foi tocada',
  'R$ 49 muda o que anos de tentativa não mudaram',
];

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: '#020B18' }}>
        <ThemeSelector />
        <Ticker items={tickerTop} />
        <Hero />
        <SectionSeparator />
        <DorSection />
        <SectionSeparator />
        <ProblemaSection />
        <SectionSeparator />
        <Ticker items={tickerMid} />
        <SectionSeparator />
        <ProdutoSection />
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
        <CTAFinalSection />
        <SectionSeparator />
        <Footer />
        <StickyBar />
      </div>
    </ThemeProvider>
  );
};

export default Index;
