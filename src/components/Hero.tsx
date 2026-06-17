import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import ParallaxStars from "./ParallaxStars";

const WASHINGTON = "https://i.imgur.com/rrlzliG.jpeg";

const bullets = [
  { Icon: TrendingUp, text: "Rentabilidade consistente operada por traders profissionais" },
  { Icon: ShieldCheck, text: "Gestão de risco com regras claras e transparência total" },
  { Icon: Cpu, text: "Tecnologia proprietária para execução e monitoramento" },
];

const Hero = () => {

  return (
    <section id="top" className="relative overflow-hidden bg-dark-radial pt-10 md:pt-16 pb-16 md:pb-24 px-4 md:px-8">
      <ParallaxStars speed={0.6} className="opacity-60" />
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">
        <div className="flex-1 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-[#D4A843]/50 bg-[#D4A843]/10 text-[#F5D87A] text-[11px] sm:text-xs uppercase tracking-widest font-semibold mb-6"
          >
            The W Consultoria e Tecnologia
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] gold-text mb-5"
          >
            Seja sócio do capital que opera o mercado.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[#F0F4F8] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mb-8"
          >
            Trading institucional, disciplina de gestão e tecnologia proprietária reunidos em um modelo de sociedade que coloca o seu capital trabalhando ao lado dos nossos traders.
          </motion.p>

          <ul className="space-y-3 mb-8 max-w-xl mx-auto md:mx-0">
            {bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                className="flex items-start gap-3 text-[#F0F4F8] text-sm sm:text-base"
              >
                <b.Icon className="w-5 h-5 text-[#F5D87A] mt-0.5 flex-shrink-0" />
                <span>{b.text}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-8"
          >
            <a href="#oferta" className="cta-button text-xs sm:text-sm">
              Quero Ser Sócio Investidor
            </a>
            <a
              href="#simulador"
              className="px-7 py-4 rounded-md border-2 border-[#D4A843] text-[#F5D87A] font-semibold uppercase tracking-wide text-xs sm:text-sm hover:bg-[#D4A843]/10 transition-colors whitespace-nowrap"
            >
              Ver Rentabilidade
            </a>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex-shrink-0 w-full md:w-auto"
        >
          <div className="relative w-[260px] sm:w-[320px] md:w-[360px] mx-auto">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#D4A843]/40 via-[#0113B7]/30 to-[#F5D87A]/20 blur-2xl" />
            <img
              src={WASHINGTON}
              alt="Washington, fundador da The W Consultoria e Tecnologia"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="relative w-full aspect-[4/5] object-cover rounded-3xl border-2 border-[#D4A843]/60 shadow-[0_0_40px_rgba(212,168,67,0.35)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
