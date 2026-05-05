import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';
import { Volume2, Pause, Play } from 'lucide-react';

const TestemunhosSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 5);
  const titleClass = getTitleClass(theme, 5);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(error => {
              console.log("Autoplay prevented:", error);
            });
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section ref={sectionRef} className={`${bg} py-12 md:py-20 px-5 md:px-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 ${titleClass}`}>
          LÍDERES QUE REABRIRAM A PORTA.
        </h2>

        <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden gold-border shadow-2xl bg-black">
          <video
            ref={videoRef}
            src="https://i.imgur.com/ab37tiS.mp4"
            className="w-full h-full object-cover"
            playsInline
            muted={isMuted}
            loop
            poster="https://i.imgur.com/ab37tiS.jpg"
          />
          
          <AnimatePresence>
            {isMuted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.1, 1],
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                onClick={toggleMute}
                className="absolute inset-0 m-auto w-32 h-32 flex flex-col items-center justify-center rounded-full bg-gold/80 text-black z-20 backdrop-blur-sm"
              >
                <Volume2 size={40} className="mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider text-center px-4">
                  Clique para ouvir
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />
          
          <button 
            onClick={togglePlay}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold z-30 transition-transform active:scale-95"
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestemunhosSection;
