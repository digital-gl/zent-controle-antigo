import { useEffect, useRef, useState } from 'react';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const GarantiaSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 7);
  const titleClass = getTitleClass(theme, 7);
  const isWhite = theme === 'light';
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`} ref={ref}>
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* 3D Animated Shield */}
        <div
          className="mb-8 transition-all duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'perspective(600px) rotateY(0deg) scale(1)' : 'perspective(600px) rotateY(-90deg) scale(0.5)',
            animation: visible ? 'shield-float 4s ease-in-out infinite' : 'none',
          }}
        >
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="shieldGold" x1="0" y1="0" x2="120" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7A5520" />
                <stop offset="30%" stopColor="#D4A843" />
                <stop offset="50%" stopColor="#F5D87A" />
                <stop offset="70%" stopColor="#D4A843" />
                <stop offset="100%" stopColor="#A07830" />
              </linearGradient>
              <linearGradient id="shieldInner" x1="0" y1="0" x2="120" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0A1E4A" />
                <stop offset="100%" stopColor="#12408A" />
              </linearGradient>
              <filter id="shieldGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Shield outline */}
            <path
              d="M60 6 L108 30 L108 80 C108 105 84 130 60 142 C36 130 12 105 12 80 L12 30 Z"
              fill="url(#shieldGold)"
              filter="url(#shieldGlow)"
            />
            {/* Shield inner */}
            <path
              d="M60 14 L101 35 L101 78 C101 100 79 123 60 134 C41 123 19 100 19 78 L19 35 Z"
              fill="url(#shieldInner)"
            />
            {/* Checkmark */}
            <path
              d="M42 68 L55 81 L78 53"
              stroke="url(#shieldGold)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* 7 dias text */}
            <text x="60" y="108" textAnchor="middle" fill="#D4A843" fontSize="15" fontWeight="bold" fontFamily="Inter">7 dias</text>
          </svg>
        </div>

        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center ${titleClass}`}>
          Garantia incondicional de 7 dias
        </h2>

        {/* Shield-shaped card */}
        <div
          className="relative w-full max-w-md"
          style={{
            clipPath: 'polygon(50% 0%, 100% 12%, 100% 65%, 50% 100%, 0% 65%, 0% 12%)',
          }}
        >
          <div
            className="px-8 pt-12 pb-16 text-center"
            style={{
              background: 'linear-gradient(145deg, #0A1E4A 0%, #12408A 50%, #0A1E4A 100%)',
            }}
          >
            <p className={`text-base sm:text-lg leading-relaxed ${isWhite ? 'text-[#0A1628]/80' : 'text-[#A8B8C8]'}`}>
              Se por qualquer motivo o diagnóstico não fizer sentido para você ou não entregar o que foi prometido, devolvemos 100% do seu investimento. Sem perguntas. Sem burocracia.
            </p>
            <p className="gold-text font-display text-lg font-semibold mt-4">
              Você não tem nada a perder e tudo a descobrir.
            </p>
          </div>
        </div>
        {/* Gold border outline underneath */}
        <div
          className="w-full max-w-md -mt-1"
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #F5D87A 30%, #D4A843 50%, #F5D87A 70%, transparent)',
          }}
        />
      </div>
    </section>
  );
};

export default GarantiaSection;
