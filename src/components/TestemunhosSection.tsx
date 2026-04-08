import { useRef, useState, useEffect } from 'react';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const testimonials = [
  {
    name: 'Rodrigo M., empresário, 42 anos',
    text: 'Achei que o problema era minha empresa. Depois do diagnóstico entendi que era um padrão que eu carregava desde antes de empreender. Finalmente fez sentido.',
  },
  {
    name: 'André L., CEO, 38 anos',
    text: 'Eu já tinha feito terapia, coaching, retiro espiritual. Nada tocava onde o diagnóstico tocou. Em minutos, vi com clareza o que me travava há anos.',
  },
  {
    name: 'Carlos H., empresário, 47 anos',
    text: 'Pensei que era burnout. Que era a pressão do mercado. O diagnóstico me mostrou que a raiz era outra, e pela primeira vez senti que podia sair daquele ciclo.',
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
          O que acontece quando a Porta Neural abre
        </h2>

        <div className="relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'linear-gradient(135deg, #D4A843, #F5D87A)',
                color: '#020B18',
                boxShadow: '0 0 15px rgba(212, 168, 67, 0.4)',
              }}
            >
              ‹
            </button>
          )}

          {/* Scrollable track */}
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

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'linear-gradient(135deg, #D4A843, #F5D87A)',
                color: '#020B18',
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
