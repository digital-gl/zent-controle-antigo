import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4';

const cards = [
  {
    title: 'Fim da Névoa Mental',
    text: 'O cortisol acumulado é processado. A velocidade de decisão que te fez grande está de volta.',
  },
  {
    title: 'Governo da Identidade',
    text: 'Você para de reagir aos traumas e começa a decidir baseado na sua visão estratégica.',
  },
  {
    title: 'Integração Subconsciente',
    text: 'A autossabotagem agressiva é desmontada na raiz biológica, trazendo clareza total.',
  },
];

const SolucaoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animRef = useRef<number>(0);

  const animateOpacity = useCallback((el: HTMLVideoElement, from: number, to: number, duration: number, onDone?: () => void) => {
    cancelAnimationFrame(animRef.current);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      el.style.opacity = String(from + (to - from) * t);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else if (onDone) {
        onDone();
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => {
      v.play();
      animateOpacity(v, 0, 1, 500);
    };

    const onTimeUpdate = () => {
      if (v.duration - v.currentTime <= 0.55) {
        animateOpacity(v, parseFloat(v.style.opacity || '1'), 0, 500);
      }
    };

    const onEnded = () => {
      v.style.opacity = '0';
      setTimeout(() => {
        v.currentTime = 0;
        v.play();
        animateOpacity(v, 0, 1, 500);
      }, 100);
    };

    v.addEventListener('canplay', onCanPlay, { once: true });
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended', onEnded);

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended', onEnded);
      cancelAnimationFrame(animRef.current);
    };
  }, [animateOpacity]);

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/80 via-[#0A1128]/50 to-[#0A1128]/90 pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="gold-text text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider text-center"
            style={{ textShadow: '0 4px 20px rgba(212,168,67,0.4)' }}
          >
            A Reabertura Sistêmica.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl font-normal mt-6 max-w-3xl text-center"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            Quando a Porta Neural se abre, o Governo é restaurado. Você sai do piloto automático do medo e recupera a sua percepção ampliada.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-6xl mx-auto">
            {cards.map(({ title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.25, ease: 'easeOut' }}
                className="bg-white/5 backdrop-blur-md border rounded-2xl p-8 flex flex-col items-center text-center"
                style={{
                  borderColor: 'rgba(212,168,67,0.3)',
                  boxShadow: '0 0 0px rgba(212,168,67,0)',
                }}
                whileHover={{
                  boxShadow: '0 0 25px rgba(212,168,67,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <h3 className="gold-text font-bold text-xl mb-2">{title}</h3>
                <p className="text-white/70 text-sm">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-center text-lg mt-16 mb-8 max-w-2xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            Você não precisa de mais força. Você precisa de Sinergia. É hora de religar a chave.
          </motion.p>

          <motion.a
            href="https://pay.hotmart.com/W99444821H?checkoutMode=10"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 30px rgba(212,175,55,0.4)' }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold rounded-full uppercase tracking-wider w-[90%] max-w-md mx-auto px-4 py-3 text-[11px] sm:text-sm md:text-base md:w-auto md:whitespace-nowrap leading-tight text-center flex items-center justify-center"
          >
            QUERO REABRIR A PORTA E RECUPERAR O GOVERNO
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default SolucaoSection;
