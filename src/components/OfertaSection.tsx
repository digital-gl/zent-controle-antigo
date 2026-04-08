import { useEffect, useRef, useState } from 'react';
import { useTheme, getSectionBg } from '@/contexts/ThemeContext';

const OfertaSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 6);
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
    <section id="oferta" className={`${bg} py-12 md:py-20 px-5 md:px-20`} ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl p-8 sm:p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0A1E4A 0%, #12408A 50%, #0A1E4A 100%)',
            border: '2px solid transparent',
            borderImage: 'linear-gradient(135deg, #7A5520, #F5D87A, #D4A843, #F5D87A, #7A5520) 1',
            boxShadow: '0 0 40px rgba(212, 168, 67, 0.15)',
          }}
        >
          {/* Shine sweep animation */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(245, 216, 122, 0.06) 45%, rgba(245, 216, 122, 0.12) 50%, rgba(245, 216, 122, 0.06) 55%, transparent 60%)',
              animation: visible ? 'shine-sweep 3s ease-in-out infinite' : 'none',
            }}
          />

          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Title with zoom-in */}
            <h2
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 gold-text transition-all duration-1000"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.8)',
              }}
            >
              Acesse o Diagnóstico da Porta Neural agora
            </h2>

            {/* Text with staggered fade */}
            <div className="space-y-5 text-[#A8B8C8] text-base sm:text-lg leading-relaxed mb-10">
              {[
                'Por R$ 49, você recebe acesso imediato ao diagnóstico completo que revela o que está travando sua mente, suas decisões e sua vida.',
                'Sem mensalidade. Sem renovação automática. Acesso vitalício ao diagnóstico.',
                'Isso é menos do que você gasta em uma refeição. E pode ser o início da virada que você tentou dar de outras formas por anos.',
              ].map((text, i) => (
                <p
                  key={i}
                  className="transition-all duration-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : `translateX(${i % 2 === 0 ? '-30px' : '30px'})`,
                    transitionDelay: `${400 + i * 200}ms`,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Price with counter-like pop */}
            <div
              className="mb-8 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.7)',
                transitionDelay: '900ms',
              }}
            >
              <p className="text-5xl sm:text-6xl font-bold gold-text font-display mb-2">R$ 49</p>
              <p className="text-[#607080] text-sm">Pagamento único · Acesso imediato</p>
            </div>

            {/* CTA with bounce-in */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '1200ms',
              }}
            >
              <a href="#" className="cta-button text-sm sm:text-base inline-block">
                QUERO O MEU DIAGNÓSTICO AGORA
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfertaSection;
