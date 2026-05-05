import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 ${titleClass}`}>
          LÍDERES QUE REABRIRAM A PORTA.
        </h2>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden gold-border shadow-2xl">
          <img 
            src="https://imgur.com/ab37tiS.jpg" 
            alt="VSL"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* If the user provides a real video ID later, this can be an iframe or video tag */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors cursor-pointer group">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gold/90 text-black group-hover:scale-110 transition-transform">
              <span className="ml-1 text-3xl">▶</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestemunhosSection;
