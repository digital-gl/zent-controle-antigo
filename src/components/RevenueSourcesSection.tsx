import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { TrendingUp, Handshake, GraduationCap, Landmark, type LucideIcon } from "lucide-react";
import revenueBg from "@/assets/revenue-bg.jpg";


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
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(900px) rotateX(0) rotateY(0)");
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTransform(
      `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTransform("perspective(900px) rotateX(0) rotateY(0) scale(1)");
        }}
        className="liquid-glass rounded-2xl p-8 h-full relative overflow-hidden"
        style={{
          transform,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          border: hovered
            ? "1.5px solid rgba(245, 216, 122, 0.6)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: hovered
            ? "0 0 40px rgba(245, 216, 122, 0.35)"
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="mb-4 inline-block"
          style={{
            animation: `float-source 3.5s ease-in-out infinite`,
            animationDelay: `${index * 0.4}s`,
            transform: hovered ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          <source.Icon size={56} color="#F5D87A" strokeWidth={1.75} />
        </div>
        <div className="gold-text font-display text-2xl mb-2">{source.n}</div>
        <h3 className="text-white font-bold text-xl md:text-2xl mb-3">
          {source.title}
        </h3>
        <p className="text-[#A8B8C8] leading-relaxed">{source.desc}</p>
      </div>
    </motion.div>
  );
};

const RevenueSourcesSection = () => {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "#000D30",
        backgroundImage:
          "linear-gradient(rgba(212,168,67,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.05) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
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
            As <span className="gold-text">4 Fontes</span> que Sustentam Seus Rendimentos
          </h2>
          <p className="text-lg md:text-xl text-[#A8B8C8]">
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
