import { useEffect, useRef, useState } from 'react';
import ParallaxStars from './ParallaxStars';

const OfertaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="oferta"
      className="relative py-12 md:py-20 px-5 md:px-20 overflow-hidden"
      ref={sectionRef}
      style={{ background: '#000005' }}
    >
      {/* Parallax stars background */}
      <ParallaxStars speed={1} />

      <div className="max-w-3xl mx-auto relative z-10">
        <div
          className="rounded-2xl p-8 sm:p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #000D30 0%, #002A90 50%, #000D30 100%)',
            border: '2px solid transparent',
            borderImage: 'linear-gradient(135deg, #7A5520, #F5D87A, #D4A843, #F5D87A, #7A5520) 1',
            boxShadow: '0 0 40px rgba(212, 168, 67, 0.15)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(245, 216, 122, 0.06) 45%, rgba(245, 216, 122, 0.12) 50%, rgba(245, 216, 122, 0.06) 55%, transparent 60%)',
              animation: visible ? 'shine-sweep 3s ease-in-out infinite' : 'none',
            }}
          />

          <div className="relative z-10 text-center flex flex-col items-center">
            <h2
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 gold-text transition-all duration-1000"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.8)',
              }}
            >
              O MAPA DA SUA LIBERTAÇÃO POR APENAS R$ 49.
            </h2>

            <p className="text-[#A8B8C8] text-base sm:text-lg leading-relaxed mb-8">
              Você está a um passo de descobrir exatamente o que está trancado no seu subconsciente.
            </p>

            <div className="text-left w-full max-w-md space-y-4 mb-10">
              <p className="text-[#A8B8C8] text-sm sm:text-base font-medium mb-4 gold-text">O que você recebe com acesso imediato:</p>
              {[
                'O Protocolo de Diagnóstico: O guia prático para identificar a trava.',
                'O Mapeamento de Padrões: Como expor os seus autossabotadores invisíveis.',
                'Aulas de Sinergia Mental: A base da PNL e Hipnose para preparar o reset.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="gold-text text-lg mt-0.5">✓</span>
                  <p className="text-[#A8B8C8] text-sm sm:text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <p className="text-[#607080] text-sm line-through mb-1">De R$ 197,00</p>
              <p className="text-5xl sm:text-6xl font-bold gold-text font-display mb-2">R$ 49</p>
              <p className="text-[#607080] text-sm">Pagamento único · Acesso imediato</p>
            </div>

            <a href="#" className="cta-button text-sm sm:text-base inline-block">
              QUERO ACESSAR MEU DIAGNÓSTICO AGORA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfertaSection;
