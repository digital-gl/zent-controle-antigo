import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lock } from 'lucide-react';

const cards = [
  {
    icon: '⚙️',
    title: 'A Decisão Corrompida',
    text: 'Você hesita em decisões simples. Sabe exatamente o que deve fazer, mas uma força invisível te trava ou te empurra para o caminho mais "seguro" e menos lucrativo.',
  },
  {
    icon: '📈',
    title: 'O Teto de Vidro Emocional',
    text: 'Toda vez que a empresa atinge um pico de sucesso, você, subconscientemente, cria um problema. Um atrito com um sócio, um gasto desnecessário. O sucesso tornou-se um gatilho de estresse.',
  },
  {
    icon: '🛡️',
    title: 'A Solidão Blindada',
    text: 'Você chega em casa, mas não consegue "desligar" o modo de guerra. Você tornou-se insensível e impaciente. A armadura que te protege no mercado está sufocando a sua família.',
  },
];

const DorSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [lockVisible, setLockVisible] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-24 px-5 md:px-20 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#000005' }}
    >
      {/* Headline */}
      <motion.h2
        className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-12 max-w-4xl"
        style={{
          color: '#F0F4F8',
          textShadow: '0 0 40px rgba(240,244,248,0.15)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        O SEU PASSADO NÃO RESOLVIDO É A SUA PRISÃO NO PRESENTE.
      </motion.h2>

      <p className="text-center mb-12 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-[#A8B8C8]">
        Se a sua Porta Neural está fechada, você não está no comando; você está apenas a reagir ao peso do que ficou trancado. O seu corpo envia os sinais:
      </p>

      {/* 3D Door Container */}
      <div className="relative w-[280px] sm:w-[340px] h-[380px] sm:h-[440px] mb-16" style={{ perspective: '1000px' }}>
        {/* Door frame */}
        <div
          className="absolute inset-0 rounded-t-[2rem] border-2"
          style={{
            borderColor: 'rgba(212,168,67,0.4)',
            background: 'linear-gradient(180deg, #000D30 0%, #000005 100%)',
          }}
        />

        {/* Left door */}
        <motion.div
          className="absolute left-0 top-0 w-1/2 h-full rounded-tl-[2rem] origin-left"
          style={{
            background: 'linear-gradient(135deg, #D4A843 0%, #7A5520 30%, #F5D87A 50%, #7A5520 70%, #D4A843 100%)',
            boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.5), inset 2px 0 8px rgba(245,216,122,0.3)',
          }}
          initial={{ rotateY: -90 }}
          animate={isInView ? { rotateY: 0 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          onAnimationComplete={() => setLockVisible(true)}
        >
          {/* Door panel detail */}
          <div
            className="absolute inset-4 rounded-tl-[1.5rem] border"
            style={{ borderColor: 'rgba(122,85,32,0.5)' }}
          />
          {/* Handle */}
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-10 rounded-full"
            style={{ background: 'linear-gradient(180deg, #F5D87A, #7A5520)' }}
          />
        </motion.div>

        {/* Right door */}
        <motion.div
          className="absolute right-0 top-0 w-1/2 h-full rounded-tr-[2rem] origin-right"
          style={{
            background: 'linear-gradient(225deg, #D4A843 0%, #7A5520 30%, #F5D87A 50%, #7A5520 70%, #D4A843 100%)',
            boxShadow: 'inset 4px 0 12px rgba(0,0,0,0.5), inset -2px 0 8px rgba(245,216,122,0.3)',
          }}
          initial={{ rotateY: 90 }}
          animate={isInView ? { rotateY: 0 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div
            className="absolute inset-4 rounded-tr-[1.5rem] border"
            style={{ borderColor: 'rgba(122,85,32,0.5)' }}
          />
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-10 rounded-full"
            style={{ background: 'linear-gradient(180deg, #F5D87A, #7A5520)' }}
          />
        </motion.div>

        {/* Lock icon appearing after doors close */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 1.4, opacity: 0 }}
          animate={lockVisible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div
            className="p-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, #D4A843 0%, #7A5520 100%)',
              boxShadow: '0 0 30px rgba(212,168,67,0.6), 0 0 60px rgba(212,168,67,0.3)',
            }}
          >
            <Lock size={40} color="#000D30" strokeWidth={2.5} />
          </div>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="rounded-lg p-6 bg-card-dark gold-border"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.8 + i * 0.2 }}
          >
            <div className="text-3xl mb-4">{card.icon}</div>
            <h3 className="gold-text font-display text-xl font-bold mb-3">{card.title}</h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#A8B8C8]">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DorSection;
