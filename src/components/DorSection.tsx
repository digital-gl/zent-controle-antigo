import { useEffect, useRef, useState } from 'react';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const cards = [
  "Você tomou todas as decisões certas. Construiu tudo que deveria. Mas em algum momento, a clareza foi embora e você não sabe exatamente quando.",
  "Você resolve tudo para todo mundo. Mas quando fecha a porta do escritório, existe uma voz que diz que alguma coisa está errada.",
  "Você já tentou orar mais, trabalhar mais, focar mais. E mesmo assim, sente que está preso num ciclo que não consegue quebrar.",
  "Você começa a semana com disposição e termina sem entender por que perdeu o fôlego no meio do caminho.",
  "Você ainda entrega resultado. Mas por dentro está carregando um peso que não consegue nomear.",
  "Você sente que se afastou de quem você era antes. E não sabe como voltar.",
];

const DorSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 1);
  const titleClass = getTitleClass(theme, 1);
  const isWhite = theme === 'light';
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(cards.length).fill(false));
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far the timeline has scrolled into view
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const scrolledInto = viewportHeight - timelineTop;
      const progress = Math.max(0, Math.min(1, scrolledInto / (timelineHeight + viewportHeight * 0.3)));
      setLineProgress(progress);

      // Check each card
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const cardRect = ref.getBoundingClientRect();
        const cardMid = cardRect.top + cardRect.height / 2;
        if (cardMid < viewportHeight * 0.85) {
          setVisibleCards((prev) => {
            if (prev[i]) return prev;
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineColor = isWhite ? '#0A3060' : '#D4A843';

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`} ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 ${titleClass}`}>
          Você reconhece pelo menos uma dessas situações?
        </h2>

        {/* Timeline layout */}
        <div className="relative" ref={timelineRef}>
          {/* Vertical growing line */}
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-[2px] origin-top"
            style={{
              height: '100%',
              background: `linear-gradient(180deg, ${lineColor}, ${lineColor})`,
              transform: `scaleY(${lineProgress})`,
              transformOrigin: 'top',
              transition: 'transform 0.1s linear',
              boxShadow: isWhite ? 'none' : `0 0 8px rgba(212, 168, 67, 0.4)`,
            }}
          />

          <div className="space-y-8 md:space-y-10">
            {cards.map((text, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot on the line */}
                  <div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-3 h-3 rounded-full z-10 transition-all duration-500"
                    style={{
                      background: visibleCards[i] ? lineColor : 'transparent',
                      border: `2px solid ${lineColor}`,
                      boxShadow: visibleCards[i] && !isWhite ? '0 0 10px rgba(212, 168, 67, 0.6)' : 'none',
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[45%] ${isLeft ? 'md:pr-8 md:mr-auto' : 'md:pl-8 md:ml-auto'} transition-all duration-700`}
                    style={{
                      opacity: visibleCards[i] ? 1 : 0,
                      transform: visibleCards[i]
                        ? 'translateY(0) scale(1)'
                        : 'translateY(30px) scale(0.95)',
                    }}
                  >
                    <div
                      className={`rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 ${
                        isWhite ? 'bg-[#F5F7FA] border border-[#D4A843]/30' : 'bg-card-dark gold-border'
                      }`}
                    >
                      <p className={`text-sm sm:text-base leading-relaxed ${isWhite ? 'text-[#0A1628]' : 'text-[#A8B8C8]'}`}>
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className={`text-center max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mt-12 ${isWhite ? 'text-[#0A1628]/80' : 'text-[#A8B8C8]'}`}>
          Se você se reconheceu em pelo menos uma dessas situações, não é fraqueza. Não é falta de fé. Não é cansaço passageiro. É um padrão interno que ninguém te ensinou a identificar.
        </p>
      </div>
    </section>
  );
};

export default DorSection;
