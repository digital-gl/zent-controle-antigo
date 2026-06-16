import { motion } from "framer-motion";
import { useRef, useState } from "react";
import ParallaxStars from "./ParallaxStars";

interface TiltCardProps {
  icon: string;
  iconClass?: string;
  number: string;
  text: string;
  barClass: string;
  highlight?: boolean;
}

const TiltCard = ({ icon, iconClass, number, text, barClass, highlight }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(${highlight ? 1.05 : 1.02})`);
  };

  const handleLeave = () => {
    setTransform(`perspective(900px) rotateX(0) rotateY(0) scale(${highlight ? 1.05 : 1})`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="liquid-glass rounded-2xl p-8 h-full flex flex-col items-center text-center relative overflow-hidden"
        style={{
          transform: transform || (highlight ? "scale(1.05)" : "scale(1)"),
          transition: "transform 0.3s ease",
          boxShadow: highlight
            ? "0 0 40px rgba(245, 216, 122, 0.4), inset 0 0 20px rgba(245, 216, 122, 0.05)"
            : "0 4px 20px rgba(0,0,0,0.3)",
          border: highlight ? "1.5px solid rgba(245, 216, 122, 0.6)" : "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className={`text-6xl mb-4 ${iconClass || ""}`}>{icon}</div>
        <div className={`text-3xl md:text-4xl font-display mb-3 ${highlight ? "gold-text" : "text-white"}`}>
          {number}
        </div>
        <p className="text-[#A8B8C8] text-base">{text}</p>
        <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${barClass}`} />
      </div>
    </motion.div>
  );
};

const PainSection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#000D30" }}>
      <ParallaxStars className="opacity-40" />
      <style>{`
        @keyframes pulse-red {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(239,68,68,0.5)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 16px rgba(239,68,68,0.9)); }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .icon-pulse-red { animation: pulse-red 1.8s ease-in-out infinite; display: inline-block; }
        .icon-float { animation: float-icon 3s ease-in-out infinite; display: inline-block; }
      `}</style>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#D4A843] uppercase tracking-widest text-sm mb-4">
            Por que seu dinheiro está parado?
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
            Seu dinheiro está <span className="text-red-400">PERDENDO</span> valor agora.
          </h2>
          <p className="text-lg md:text-xl text-[#A8B8C8] max-w-3xl mx-auto">
            A inflação corrói 4% ao ano. A poupança rende 0,5% ao mês. Enquanto isso, o tempo passa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          <TiltCard
            icon="📉"
            iconClass="icon-pulse-red"
            number="0,5% ao mês"
            text="Perde para a inflação todo mês"
            barClass="bg-gradient-to-r from-red-700 via-red-500 to-red-700"
          />
          <TiltCard
            icon="⚖️"
            number="~1% ao mês"
            text="Quase empata com a inflação"
            barClass="bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700"
          />
          <TiltCard
            icon="🚀"
            iconClass="icon-float"
            number="Até 8% ao mês"
            text="Supera qualquer investimento tradicional"
            barClass="bg-gradient-to-r from-[#A07830] via-[#F5D87A] to-[#A07830]"
            highlight
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-2xl p-6 md:p-8"
        >
          <p className="text-center text-white text-lg md:text-xl mb-6">
            Em 12 meses: <span className="text-red-400 font-semibold">Poupança +6%</span> vs{" "}
            <span className="gold-text font-semibold">The W +152%</span>
          </p>
          <div className="space-y-5 max-w-3xl mx-auto">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#A8B8C8]">Poupança</span>
                <span className="text-red-400 font-semibold">+6%</span>
              </div>
              <div className="h-3 bg-[#000005] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "6%" }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-red-700 to-red-400 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#A8B8C8]">The W Consultoria</span>
                <span className="gold-text font-semibold">+152%</span>
              </div>
              <div className="h-3 bg-[#000005] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #A07830, #F5D87A, #D4A843)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainSection;
