import { useState, useMemo } from 'react';
import lucasImg from '@/assets/lucas-terno.jpg';
import { motion } from 'framer-motion';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const credentials = [
  { label: 'Rigor Acadêmico', text: 'Mestre pela USP com vivência e especialização em Londres.' },
  { label: 'Certificação Global', text: 'Hipnoterapeuta Clínico associado à HYA (The International Hypnosis Association – EUA).' },
  { label: 'Expertise Técnica', text: 'Practitioner em PNL, focado no desmonte de bloqueios subconscientes profundos.' },
  { label: 'Visão de Campo', text: 'Como empresário e advogado, Lucas compreende a pressão real e biológica de quem gere patrimônios e vidas.' },
];

/* Generate random particles once */
const generateParticles = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
  }));

const AutoridadeSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 4);
  const titleClass = getTitleClass(theme, 4);
  const isWhite = theme === 'light';
  const [imgLoaded, setImgLoaded] = useState(false);
  const particles = useMemo(() => generateParticles(15), []);

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 ${titleClass}`}>
          O AUDITOR DA SUA MENTE.
        </h2>
        <p className={`text-center mb-12 text-base sm:text-lg ${isWhite ? 'text-[#0A1628]/70' : 'text-[#A8B8C8]'}`}>
          Lucas Marsili. Especialista em Engenharia Comportamental.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Photo container with effects */}
          <div className="flex-shrink-0 relative">
            {/* Floating particles behind photo */}
            <div className="absolute -inset-8 pointer-events-none overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {particles.map((p) => (
                  <motion.circle
                    key={p.id}
                    cx={p.x}
                    cy={p.y}
                    r={p.size / 10}
                    fill="#D4A843"
                    initial={{ opacity: 0.2, y: 0 }}
                    animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -8, 0] }}
                    transition={{
                      duration: p.duration,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Spinning conic gradient border */}
            <div className="relative">
              <motion.div
                className="absolute -inset-[3px] rounded-lg"
                style={{
                  background: 'conic-gradient(from 0deg, #7A5520, #F5D87A, #0113B7, #001A5E, #D4A843, #F5D87A, #7A5520)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative rounded-lg overflow-hidden">
                {!imgLoaded && <div className="skeleton-gold w-[220px] h-[300px]" />}
                <img
                  src={lucasImg}
                  alt="Lucas Marsili"
                  className={`w-[220px] sm:w-[260px] object-cover relative z-[1] ${imgLoaded ? 'block' : 'hidden'}`}
                  onLoad={() => setImgLoaded(true)}
                />

                {/* Scanner line */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] z-[2] pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #D4A843, #F5D87A, #D4A843, transparent)',
                    boxShadow: '0 0 12px rgba(212,168,67,0.8), 0 0 4px rgba(212,168,67,1)',
                  }}
                  animate={{ top: ['5%', '95%', '5%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {credentials.map((item, i) => (
              <div
                key={i}
                className={`rounded-lg p-5 ${isWhite ? 'bg-[#F5F7FA] border border-[#D4A843]/30' : 'bg-card-dark gold-border'}`}
              >
                <p className="gold-text font-semibold text-sm uppercase tracking-wide mb-1">{item.label}</p>
                <p className={`text-base leading-relaxed ${isWhite ? 'text-[#0A1628]' : 'text-[#A8B8C8]'}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoridadeSection;
