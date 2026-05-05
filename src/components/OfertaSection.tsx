import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import ParallaxStars from './ParallaxStars';

const HorizontalChain = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 600 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    {[0, 70, 140, 210, 280, 350, 420, 490].map((x) => (
      <g key={x}>
        <rect x={x} y="8" width="55" height="44" rx="22" stroke="url(#chainGradH)" strokeWidth="8" fill="none" />
      </g>
    ))}
    <defs>
      <linearGradient id="chainGradH" x1="0" y1="0" x2="600" y2="60">
        <stop offset="0%" stopColor="#7A5520" />
        <stop offset="30%" stopColor="#F5D87A" />
        <stop offset="50%" stopColor="#D4A843" />
        <stop offset="70%" stopColor="#F5D87A" />
        <stop offset="100%" stopColor="#7A5520" />
      </linearGradient>
    </defs>
  </svg>
);

const VerticalChain = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    {[0, 70, 140, 210, 280, 350, 420, 490].map((y) => (
      <g key={y}>
        <rect x="8" y={y} width="44" height="55" rx="22" stroke="url(#chainGradV)" strokeWidth="8" fill="none" />
      </g>
    ))}
    <defs>
      <linearGradient id="chainGradV" x1="0" y1="0" x2="60" y2="600">
        <stop offset="0%" stopColor="#7A5520" />
        <stop offset="30%" stopColor="#F5D87A" />
        <stop offset="50%" stopColor="#D4A843" />
        <stop offset="70%" stopColor="#F5D87A" />
        <stop offset="100%" stopColor="#7A5520" />
      </linearGradient>
    </defs>
  </svg>
);

const PadlockSVG = () => (
  <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lockShackle" x1="20" y1="0" x2="80" y2="50">
        <stop offset="0%" stopColor="#F5D87A" />
        <stop offset="50%" stopColor="#D4A843" />
        <stop offset="100%" stopColor="#7A5520" />
      </linearGradient>
      <linearGradient id="lockBody" x1="10" y1="45" x2="90" y2="115">
        <stop offset="0%" stopColor="#D4A843" />
        <stop offset="40%" stopColor="#F5D87A" />
        <stop offset="100%" stopColor="#7A5520" />
      </linearGradient>
    </defs>
    <path d="M25 50 V30 A25 25 0 0 1 75 30 V50" stroke="url(#lockShackle)" strokeWidth="10" strokeLinecap="round" fill="none" />
    <rect x="10" y="45" width="80" height="65" rx="10" fill="url(#lockBody)" stroke="#7A5520" strokeWidth="2" />
    <circle cx="50" cy="73" r="9" fill="#000D30" />
    <rect x="46" y="78" width="8" height="16" rx="3" fill="#000D30" />
  </svg>
);

const chainFallTransition = { duration: 0.9, ease: [0.45, 0, 0.55, 1] as const };

const bullets = [
  'O Protocolo de Diagnóstico: O guia prático para identificar a trava.',
  'O Mapeamento de Padrões: Como expor os seus autossabotadores invisíveis.',
  'Aulas de Sinergia Mental: A base da PNL e Hipnose para preparar o reset.',
];

const OfertaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="oferta"
      className="relative py-16 md:py-24 px-5 md:px-20 overflow-hidden min-h-[80vh] flex items-center justify-center"
      ref={sectionRef}
      style={{ background: '#000005' }}
    >
      <ParallaxStars speed={1} />

      <div className="max-w-3xl mx-auto relative z-10 w-full">
        <div className="relative">
          <motion.div
            className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #000D30 0%, #001A5E 50%, #000D30 100%)',
              border: '1px solid rgba(212,168,67,0.3)',
              backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0.4, scale: 0.97 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              boxShadow: '0 0 40px rgba(212,175,55,0.4)',
            } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="relative z-10 text-center flex flex-col items-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gold-text">
                O MAPA DA SUA LIBERTAÇÃO
              </h2>


              <div className="w-full max-w-md space-y-2 mb-4">
                <p className="text-sm sm:text-base font-medium mb-2 gold-text text-left">
                  O que você recebe com acesso imediato:
                </p>
                {bullets.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-3 flex items-start gap-3 bg-card-dark gold-border"
                  >
                    <Check className="mt-0.5 flex-shrink-0" size={16} color="#D4A843" />
                    <p className="text-[#A8B8C8] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-[#607080] text-sm line-through mb-1">De R$ 197,00</p>
                <p className="font-display font-bold gold-text mb-0" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}>
                  POR APENAS R$ 49,00
                </p>
                <p className="gold-text text-sm font-semibold mb-1">Na semana de Lançamento</p>
              </div>

              <a
                href="#"
                className="cta-button w-[90%] max-w-md mx-auto px-4 py-3 text-[11px] sm:text-sm md:text-base md:w-auto md:whitespace-nowrap leading-tight text-center flex items-center justify-center transition-transform duration-200 hover:scale-105"
              >
                QUERO ACESSAR MEU DIAGNÓSTICO
              </a>
              <p className="text-[#607080] text-sm mt-4">Pagamento único · Acesso imediato</p>
            </div>
          </motion.div>

          {/* Chains */}
          <motion.div
            className="absolute top-[20%] left-[-10%] right-[-10%] h-[50px] z-20 pointer-events-none"
            initial={{ y: 0, opacity: 1 }}
            animate={isInView ? { y: 350, rotate: 8, opacity: 0 } : {}}
            transition={{ ...chainFallTransition, delay: 0.3 }}
          >
            <HorizontalChain className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute top-[60%] left-[-10%] right-[-10%] h-[50px] z-20 pointer-events-none"
            initial={{ y: 0, opacity: 1 }}
            animate={isInView ? { y: 300, rotate: -6, opacity: 0 } : {}}
            transition={{ ...chainFallTransition, delay: 0.4 }}
          >
            <HorizontalChain className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            style={{ transform: 'rotate(35deg)' }}
            initial={{ y: 0, opacity: 1 }}
            animate={isInView ? { y: 400, opacity: 0 } : {}}
            transition={{ ...chainFallTransition, delay: 0.2 }}
          >
            <VerticalChain className="h-[140%] w-[50px]" />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            style={{ transform: 'rotate(-35deg)' }}
            initial={{ y: 0, opacity: 1 }}
            animate={isInView ? { y: 400, opacity: 0 } : {}}
            transition={{ ...chainFallTransition, delay: 0.2 }}
          >
            <VerticalChain className="h-[140%] w-[50px]" />
          </motion.div>

          <motion.div
            className="absolute top-[-10%] bottom-[-10%] left-[15%] w-[50px] z-20 pointer-events-none"
            initial={{ y: 0, opacity: 1 }}
            animate={isInView ? { y: 350, rotate: 12, opacity: 0 } : {}}
            transition={{ ...chainFallTransition, delay: 0.35 }}
          >
            <VerticalChain className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute top-[-10%] bottom-[-10%] right-[15%] w-[50px] z-20 pointer-events-none"
            initial={{ y: 0, opacity: 1 }}
            animate={isInView ? { y: 350, rotate: -12, opacity: 0 } : {}}
            transition={{ ...chainFallTransition, delay: 0.35 }}
          >
            <VerticalChain className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            initial={{ scale: 1, opacity: 1 }}
            animate={isInView ? { scale: 2.5, opacity: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <div
              className="p-3 rounded-xl"
              style={{
                background: 'radial-gradient(circle, rgba(212,168,67,0.3) 0%, transparent 70%)',
                filter: 'drop-shadow(0 0 20px rgba(212,168,67,0.6))',
              }}
            >
              <PadlockSVG />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-2xl z-[15] pointer-events-none"
            style={{ background: 'rgba(0,0,5,0.5)' }}
            initial={{ opacity: 1 }}
            animate={isInView ? { opacity: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      </div>
    </section>
  );
};

export default OfertaSection;
