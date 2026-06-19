import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Rocket, Target, type LucideIcon } from "lucide-react";
import ParallaxStars from "./ParallaxStars";

const profiles: { n: string; Icon: LucideIcon; title: string; text: string }[] = [
  {
    n: "01",
    Icon: Briefcase,
    title: "Profissional liberal",
    text: "Quer fazer o capital trabalhar sem precisar virar trader nem acompanhar telas o dia inteiro.",
  },
  {
    n: "02",
    Icon: Rocket,
    title: "Empresário",
    text: "Busca diversificar a reserva da empresa em uma operação séria, com gestão de risco institucional.",
  },
  {
    n: "03",
    Icon: Target,
    title: "Investidor experiente",
    text: "Já testou estratégias e quer acessar uma mesa profissional com resultado verificável.",
  },
];

const ProfileCard = ({
  profile,
  index,
}: {
  profile: (typeof profiles)[number];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-xl p-7 md:p-8 h-full relative"
        style={{
          background: "rgba(10, 14, 28, 0.85)",
          borderLeft: "4px solid #F5D87A",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered
            ? "-12px 0 32px -6px rgba(245, 216, 122, 0.55), inset 4px 0 16px -8px rgba(245, 216, 122, 0.4)"
            : "-6px 0 18px -6px rgba(245, 216, 122, 0.25)",
        }}
      >
        <div className="flex items-center gap-4 mb-3">
          <div
            className="flex items-center justify-center rounded-md shrink-0"
            style={{
              width: 44,
              height: 44,
              background: "rgba(0, 0, 0, 0.45)",
              border: "1px solid rgba(245, 216, 122, 0.18)",
            }}
          >
            <profile.Icon size={24} color="#F5D87A" strokeWidth={2} />
          </div>
          <div className="flex items-baseline gap-3 min-w-0 flex-wrap">
            <span className="gold-text font-bold text-sm">{profile.n}</span>
            <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-wider">
              {profile.title}
            </h3>
          </div>
        </div>
        <p className="text-[#A8B8C8] text-sm md:text-base leading-relaxed">
          {profile.text}
        </p>
      </div>
    </motion.div>
  );
};

const ParaQuemSection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 md:px-8" style={{ background: "#000D30" }}>
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
            <ProfileCard key={p.n} profile={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParaQuemSection;
