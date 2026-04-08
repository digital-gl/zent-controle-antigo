import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import ParallaxStars from './ParallaxStars';

/* SVG chain path — a simple chain-link pattern */
const ChainSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 60 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0, 80, 160, 240, 320].map((y) => (
      <g key={y}>
        <rect x="12" y={y} width="36" height="50" rx="12" stroke="#D4A843" strokeWidth="6" fill="none" />
        <rect x="18" y={y + 40} width="24" height="50" rx="10" stroke="#D4A843" strokeWidth="5" fill="none" opacity="0.6" />
      </g>
    ))}
  </svg>
);

/* SVG padlock */
const PadlockSVG = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 60 V40 A30 30 0 0 1 90 40 V60"
      stroke="url(#lockGrad)" strokeWidth="10" strokeLinecap="round" fill="none"
    />
    <rect x="15" y="55" width="90" height="75" rx="12" fill="url(#lockBodyGrad)" stroke="#D4A843" strokeWidth="3" />
    <circle cx="60" cy="90" r="10" fill="#000D30" />
    <rect x="56" y="95" width="8" height="18" rx="3" fill="#000D30" />
    <defs>
      <linearGradient id="lockGrad" x1="30" y1="20" x2="90" y2="60">
        <stop offset="0%" stopColor="#F5D87A" />
        <stop offset="100%" stopColor="#7A5520" />
      </linearGradient>
      <linearGradient id="lockBodyGrad" x1="15" y1="55" x2="105" y2="130">
        <stop offset="0%" stopColor="#D4A843" />
        <stop offset="50%" stopColor="#F5D87A" />
        <stop offset="100%" stopColor="#7A5520" />
      </linearGradient>
    </defs>
  </svg>
);

const chainTransition = { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const };

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
        {/* Wrapper for card + overlays */}
        <div className="relative">
          {/* === OFFER CARD === */}
          <motion.div
            className="rounded-2xl p-8 sm:p-12 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #000D30 0%, #001A5E 50%, #000D30 100%)',
              border: '1px solid rgba(212,168,67,0.3)',
              backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              boxShadow: '0 0 30px rgba(212,175,55,0.4)',
            } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative z-10 text-center flex flex-col items-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 gold-text">
                O MAPA DA SUA LIBERTAÇÃO POR APENAS R$ 49.
              </h2>

              <p className="text-[#A8B8C8] text-base sm:text-lg leading-relaxed mb-8">
                Você está a um passo de descobrir exatamente o que está trancado no seu subconsciente.
              </p>

              <div className="text-left w-full max-w-md space-y-4 mb-10">
                <p className="text-sm sm:text-base font-medium mb-4 gold-text">
                  O que você recebe com acesso imediato:
                </p>
                {[
                  'O Protocolo de Diagnóstico: O guia prático para identificar a trava.',
                  'O Mapeamento de Padrões: Como expor os seus autossabotadores invisíveis.',
                  'Aulas de Sinergia Mental: A base da PNL e Hipnose para preparar o reset.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="mt-1 flex-shrink-0" size={18} color="#D4A843" />
                    <p className="text-[#A8B8C8] text-sm sm:text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <p className="text-[#607080] text-sm line-through mb-1">De R$ 197,00</p>
                <p className="font-display font-bold gold-text mb-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}>
                  POR APENAS R$ 49,00
                </p>
                <p className="text-[#607080] text-sm">Pagamento único · Acesso imediato</p>
              </div>

              <a
                href="#"
                className="cta-button text-sm sm:text-base inline-block whitespace-nowrap transition-transform duration-200 hover:scale-105"
              >
                QUERO ACESSAR MEU DIAGNÓSTICO AGORA
              </a>
            </div>
          </motion.div>

          {/* === CHAINS OVERLAY === */}
          {/* Left chain */}
          <motion.div
            className="absolute top-0 left-4 sm:left-8 h-full w-[60px] z-20 pointer-events-none"
            initial={{ y: 0, rotate: 0, opacity: 0.8 }}
            animate={isInView ? { y: 300, rotate: 15, opacity: 0 } : {}}
            transition={chainTransition}
          >
            <ChainSVG className="w-full h-full" />
          </motion.div>

          {/* Right chain */}
          <motion.div
            className="absolute top-0 right-4 sm:right-8 h-full w-[60px] z-20 pointer-events-none"
            initial={{ y: 0, rotate: 0, opacity: 0.8 }}
            animate={isInView ? { y: 300, rotate: -15, opacity: 0 } : {}}
            transition={chainTransition}
          >
            <ChainSVG className="w-full h-full" />
          </motion.div>

          {/* Diagonal chain left-top to right-bottom */}
          <motion.div
            className="absolute -top-4 -left-4 w-[80px] z-20 pointer-events-none"
            style={{ transform: 'rotate(35deg)', transformOrigin: 'top left' }}
            initial={{ y: 0, opacity: 0.7 }}
            animate={isInView ? { y: 400, opacity: 0 } : {}}
            transition={{ ...chainTransition, delay: 0.1 }}
          >
            <ChainSVG className="w-full" style={{ height: '500px' }} />
          </motion.div>

          {/* Diagonal chain right-top to left-bottom */}
          <motion.div
            className="absolute -top-4 -right-4 w-[80px] z-20 pointer-events-none"
            style={{ transform: 'rotate(-35deg)', transformOrigin: 'top right' }}
            initial={{ y: 0, opacity: 0.7 }}
            animate={isInView ? { y: 400, opacity: 0 } : {}}
            transition={{ ...chainTransition, delay: 0.1 }}
          >
            <ChainSVG className="w-full" style={{ height: '500px' }} />
          </motion.div>

          {/* Padlock center */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            initial={{ scale: 1, opacity: 1 }}
            animate={isInView ? { scale: 2, opacity: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <PadlockSVG className="w-24 h-28 sm:w-32 sm:h-36" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfertaSection;
