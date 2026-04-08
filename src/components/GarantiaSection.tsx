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
                <stop offset="0%" stopColor="#000D30" />
                <stop offset="100%" stopColor="#002A90" />
              </linearGradient>
              <filter id="shieldGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M60 6 L108 30 L108 80 C108 105 84 130 60 142 C36 130 12 105 12 80 L12 30 Z" fill="url(#shieldGold)" filter="url(#shieldGlow)" />
            <path d="M60 14 L101 35 L101 78 C101 100 79 123 60 134 C41 123 19 100 19 78 L19 35 Z" fill="url(#shieldInner)" />
            <path d="M42 68 L55 81 L78 53" stroke="url(#shieldGold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="60" y="108" textAnchor="middle" fill="#D4A843" fontSize="13" fontWeight="bold" fontFamily="Inter">100%</text>
          </svg>
        </div>

        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center ${titleClass}`}>
          LIBERDADE OU REEMBOLSO INTEGRAL.
        </h2>

        <div
          className={`rounded-lg p-6 sm:p-8 text-center ${isWhite ? 'bg-[#F5F7FA] border border-[#D4A843]/30' : 'bg-card-dark gold-border'}`}
        >
          <p className={`text-base sm:text-lg leading-relaxed mb-4 ${isWhite ? 'text-[#0A1628]/80' : 'text-[#A8B8C8]'}`}>
            Eu confio tanto na precisão técnica deste protocolo que o risco é 100% meu. Se após acessar o diagnóstico você não obtiver a clareza prometida sobre os seus bloqueios, basta enviar um e-mail. Devolveremos todo o seu investimento imediatamente, sem perguntas.
          </p>
          <p className="gold-text font-display text-lg font-semibold">
            O único risco real é você continuar a pilotar a sua empresa no escuro.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GarantiaSection;
