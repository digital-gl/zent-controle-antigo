import { motion } from "framer-motion";
import { Briefcase, Rocket, Target } from "lucide-react";
import ParallaxStars from "./ParallaxStars";

const profiles = [
  {
    Icon: Briefcase,
    title: "Profissional liberal",
    text: "Quer fazer o capital trabalhar sem precisar virar trader nem acompanhar telas o dia inteiro.",
  },
  {
    Icon: Rocket,
    title: "Empresário",
    text: "Busca diversificar a reserva da empresa em uma operação séria, com gestão de risco institucional.",
  },
  {
    Icon: Target,
    title: "Investidor experiente",
    text: "Já testou estratégias e quer acessar uma mesa profissional com resultado verificável.",
  },
];

const ParaQuemSection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 md:px-8" style={{ background: "#000D30" }}>
      <ParallaxStars speed={0.6} className="opacity-60" />
      <div className="relative max-w-6xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl gold-text text-center mb-14"
        >
          Para quem é a The W.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {profiles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="liquid-glass rounded-2xl p-7"
            >
              <p.Icon className="w-10 h-10 text-[#F5D87A] mb-4" />
              <h3 className="font-display text-2xl gold-text mb-3">{p.title}</h3>
              <p className="text-[#A8B8C8] text-sm leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParaQuemSection;
