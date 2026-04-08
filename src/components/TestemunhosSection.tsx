import { useRef, useState, useEffect } from 'react';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const testimonials = [
  {
    name: 'Depoimento 1',
    text: '"A clareza que este diagnóstico me trouxe vale cem vezes o investimento. Eu finalmente joguei luz no que me travava no escuro."',
  },
  {
    name: 'Depoimento 2',
    text: '"Eu achava que o problema era a empresa. Depois do diagnóstico entendi que era um padrão que eu carregava desde antes de empreender."',
  },
  {
    name: 'Depoimento 3',
    text: '"Em minutos, vi com clareza o que me travava há anos. Nenhuma terapia ou coaching tinha tocado nesse ponto."',
  },
];

const TestemunhosSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 5);
  const titleClass = getTitleClass(theme, 5);
  const isWhite = theme === 'light';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll);
    return () => { if (el) el.removeEventListener('scroll', checkScroll); };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 ${titleClass}`}>
          LÍDERES QUE REABRIRAM A PORTA.
        </h2>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'linear-gradient(135deg, #D4A843, #F5D87A)',
                color: '#000005',
                boxShadow: '0 0 15px rgba(212, 168, 67, 0.4)',
              }}
            >
              ‹
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`snap-center shrink-0 w-[85vw] md:w-[400px] rounded-lg p-6 ${
                  isWhite ? 'bg-[#F5F7FA] border border-[#D4A843]/30' : 'bg-card-dark gold-border'
                }`}
              >
                <div className="gold-text text-3xl mb-4 font-display">"</div>
                <p className={`text-base leading-relaxed mb-6 ${isWhite ? 'text-[#0A1628]/80' : 'text-[#A8B8C8]'}`}>
                  {t.text}
                </p>
                <p className="gold-text text-sm font-semibold">{t.name}</p>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'linear-gradient(135deg, #D4A843, #F5D87A)',
                color: '#000005',
                boxShadow: '0 0 15px rgba(212, 168, 67, 0.4)',
              }}
            >
              ›
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestemunhosSection;
