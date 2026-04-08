import { useRef, useState, useEffect } from 'react';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const items = [
  {
    title: 'Padrões bloqueadores',
    desc: 'Qual padrão interno está bloqueando suas decisões',
  },
  {
    title: 'Porta Neural travada',
    desc: 'Onde sua Porta Neural travou e por que ela permanece fechada',
  },
  {
    title: 'Sabotadores invisíveis',
    desc: 'Quais sabotadores invisíveis operam na sua mente sem que você perceba',
  },
  {
    title: 'Clareza mental',
    desc: 'O que precisa acontecer para que a clareza mental volte',
  },
];

const ProdutoSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 3);
  const titleClass = getTitleClass(theme, 3);
  const isWhite = theme === 'light';

  const wheelRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setRotation(-activeItem * (360 / items.length));
  }, [activeItem]);

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      setActiveItem((prev) => Math.min(prev + 1, items.length - 1));
    } else {
      setActiveItem((prev) => Math.max(prev - 1, 0));
    }
  };

  // Touch handling for mobile drag
  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 30) {
      if (diff > 0) setActiveItem((prev) => Math.min(prev + 1, items.length - 1));
      else setActiveItem((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 ${titleClass}`}>
          O Diagnóstico da Porta Neural
        </h2>
        <p className={`text-center mb-6 text-base sm:text-lg ${isWhite ? 'text-[#0A1628]/70' : 'text-[#A8B8C8]'}`}>
          A primeira ferramenta que identifica o que está travando sua mente por dentro, não os sintomas de fora.
        </p>
        <div className={`text-center mb-10 text-base sm:text-lg leading-relaxed ${isWhite ? 'text-[#0A1628]/80' : 'text-[#A8B8C8]'}`}>
          <p>É um diagnóstico guiado, desenvolvido a partir do método de hipnoterapia e PNL que Lucas Marsili aplica em sessões individuais com empresários e profissionais.</p>
          <p className="mt-4 font-medium gold-text">Em minutos, você vai descobrir:</p>
        </div>

        {/* Golden Wheel */}
        <div
          ref={wheelRef}
          className="relative mx-auto mb-10 select-none"
          style={{ width: '100%', maxWidth: 420, height: 420 }}
          onWheel={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #0A1E4A, #12408A) padding-box, linear-gradient(135deg, #7A5520, #F5D87A, #D4A843, #F5D87A, #7A5520) border-box',
              border: '3px solid transparent',
              boxShadow: '0 0 30px rgba(212, 168, 67, 0.2)',
            }}
          />

          {/* Rotating items */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {items.map((item, i) => {
              const angle = (i * 360) / items.length;
              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center cursor-pointer"
                  style={{
                    width: 80,
                    height: 80,
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${angle}deg) translateY(-150px) rotate(-${angle}deg)`,
                    marginLeft: -40,
                    marginTop: -40,
                  }}
                  onClick={() => setActiveItem(i)}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500"
                    style={{
                      transform: `rotate(-${rotation}deg)`,
                      background: activeItem === i
                        ? 'linear-gradient(135deg, #D4A843, #F5D87A)'
                        : 'rgba(212, 168, 67, 0.15)',
                      color: activeItem === i ? '#040D2E' : '#D4A843',
                      boxShadow: activeItem === i ? '0 0 20px rgba(212, 168, 67, 0.5)' : 'none',
                      border: '2px solid rgba(212, 168, 67, 0.4)',
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-8 max-w-[260px]">
              <p className="gold-text font-display text-lg font-bold mb-2">{items[activeItem].title}</p>
              <p className={`text-sm leading-relaxed ${isWhite ? 'text-[#0A1628]' : 'text-[#A8B8C8]'}`}>
                {items[activeItem].desc}
              </p>
            </div>
          </div>

          {/* Navigation hint */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveItem(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: activeItem === i ? '#F5D87A' : 'rgba(212, 168, 67, 0.3)',
                  boxShadow: activeItem === i ? '0 0 8px rgba(245, 216, 122, 0.6)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        <p className="text-[#607080] text-sm text-center mb-10">
          Use o scroll ou toque para girar a roda
        </p>

        <p className={`text-base sm:text-lg leading-relaxed text-center ${isWhite ? 'text-[#0A1628]/80' : 'text-[#A8B8C8]'}`}>
          Não é um teste de personalidade. Não é um questionário genérico. É um diagnóstico real, baseado em método clínico, entregue de forma acessível para quem está pronto para entender o que está acontecendo de verdade.
        </p>
      </div>
    </section>
  );
};

export default ProdutoSection;
