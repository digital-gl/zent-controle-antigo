import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { TrendingUp, Handshake, GraduationCap, Landmark, type LucideIcon } from "lucide-react";
import revenueBg from "@/assets/revenue-bg.jpg";
import revenueBgMobile from "@/assets/revenue-bg-mobile.jpg";



const sources: { n: string; Icon: LucideIcon; title: string; desc: string }[] = [
  {
    n: "01",
    Icon: TrendingUp,
    title: "Operações Forex",
    desc: "Ganhos diários no maior mercado financeiro global, operando em dólar 24 horas.",
  },
  {
    n: "02",
    Icon: Handshake,
    title: "Parcerias Estratégicas",
    desc: "Comissões diárias de corretoras internacionais parceiras em dólar.",
  },
  {
    n: "03",
    Icon: GraduationCap,
    title: "Mensalidade de Alunos",
    desc: "Receita recorrente de alunos no Brasil e nos Estados Unidos.",
  },
  {
    n: "04",
    Icon: Landmark,
    title: "Microcrédito Estruturado",
    desc: "Juros sobre capital emprestado. Fonte sólida de receita passiva.",
  },
];

const TiltCard = ({
  source,
  index,
}: {
  source: (typeof sources)[number];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
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
            <source.Icon size={24} color="#F5D87A" strokeWidth={2} />
          </div>
          <div className="flex items-baseline gap-3 min-w-0 flex-wrap">
            <span className="gold-text font-bold text-sm">{source.n}</span>
            <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-wider">
              {source.title}
            </h3>
          </div>
        </div>
        <p className="text-[#A8B8C8] text-sm md:text-base leading-relaxed">
          {source.desc}
        </p>
      </div>
    </motion.div>
  );
};

const RevenueSourcesSection = () => {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "#000000",
        backgroundImage:
          "linear-gradient(rgba(212,168,67,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={revenueBgMobile} />
        <img
          src={revenueBg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover md:object-contain object-center pointer-events-none"
          style={{ opacity: 0.5 }}
        />
      </picture>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />


      <style>{`
        @keyframes float-source {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>


      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
            As <span className="gold-shine italic">4 Fontes</span> que Sustentam Seus Rendimentos
          </h2>
          <p className="text-lg md:text-xl gold-text">
            Diversificação real. Resultados consistentes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {sources.map((s, i) => (
            <TiltCard key={s.n} source={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RevenueSourcesSection;
