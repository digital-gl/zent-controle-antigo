import { motion } from "framer-motion";
import { PiggyBank, Landmark, LineChart, Crown } from "lucide-react";
import CardSwap, { Card } from "./CardSwap";
import { Component as EtherealShadow } from "./ui/etheral-shadow";
import { useIsMobile } from "@/hooks/use-mobile";

interface InvestmentData {
  name: string;
  monthly: string;
  yearly: string;
  description: string;
  Icon: typeof PiggyBank;
  isGold?: boolean;
}

const investments: InvestmentData[] = [
  {
    name: "Poupança",
    monthly: "~0,5% ao mês",
    yearly: "~6% ao ano",
    description: "Perde para a inflação. Seu dinheiro encolhe em poder de compra.",
    Icon: PiggyBank,
  },
  {
    name: "CDI",
    monthly: "~0,9% ao mês",
    yearly: "~11% ao ano",
    description: "Acompanha a taxa básica. Rentabilidade limitada e previsível.",
    Icon: Landmark,
  },
  {
    name: "Ibovespa",
    monthly: "Volátil",
    yearly: "~10% médio",
    description: "Alta volatilidade. Anos negativos são comuns na bolsa.",
    Icon: LineChart,
  },
  {
    name: "The W Consultoria",
    monthly: "5% ao mês",
    yearly: "+152% no contrato",
    description: "Operações reais em Forex, ouro e microcrédito. Resultado consistente.",
    Icon: Crown,
    isGold: true,
  },
];

const ComparisonCardSwap = () => {
  const goldIdx = investments.findIndex((i) => i.isGold);
  const isMobile = useIsMobile();
  const cardW = isMobile ? 280 : 380;
  const cardH = isMobile ? 230 : 280;
  const containerW = isMobile ? 320 : 420;
  const containerH = isMobile ? 280 : 320;
  const cardDist = isMobile ? 28 : 50;
  const vertDist = isMobile ? 32 : 55;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#000005" }}>
      <div className="absolute inset-0 pointer-events-none">
        <EtherealShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 0.5, scale: 1.2 }}
          sizing="fill"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#D4A843] uppercase tracking-widest text-sm mb-4">
            Comparativo de investimentos
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
            Veja a <span className="gold-text italic">diferença real</span> entre as opções
          </h2>
          <p className="text-base md:text-lg text-[#A8B8C8] max-w-2xl mx-auto">
            Compare e descubra por que a The W entrega um resultado fora do convencional.
          </p>
        </motion.div>

        <div className="flex justify-center items-center min-h-[420px] md:min-h-[520px]">
          <div className="relative" style={{ width: containerW, height: containerH }}>
            <CardSwap
              width={cardW}
              height={cardH}
              cardDistance={cardDist}
              verticalDistance={vertDist}
              delay={2800}
              pauseOnHover
              skewAmount={5}
              easing="elastic"
              stopAtIndex={goldIdx}
            >
              {investments.map((inv) => {
                const Icon = inv.Icon;
                if (inv.isGold) {
                  return (
                    <Card
                      key={inv.name}
                      className="p-5 md:p-7 overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(145deg, #F5D87A 0%, #D4A843 45%, #A07830 100%)",
                        borderColor: "rgba(0,0,0,0.4)",
                        boxShadow:
                          "0 20px 60px rgba(212,168,67,0.55), inset 0 1px 0 rgba(255,255,255,0.6)",
                      }}
                    >
                      <div className="relative h-full flex flex-col text-[#0B0B14]">
                        <div className="flex items-start justify-between mb-3 md:mb-4">
                          <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-black/15 border border-black/30">
                            <Icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={2} />
                          </div>
                          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-black/80 text-[#F5D87A] px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                            Destaque
                          </span>
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl mb-1 md:mb-2">{inv.name}</h3>
                        <div className="flex items-baseline gap-2 md:gap-3 mb-2 md:mb-3">
                          <span className="text-lg md:text-2xl font-bold">{inv.monthly}</span>
                          <span className="text-xs md:text-sm opacity-70">/ {inv.yearly}</span>
                        </div>
                        <p className="text-xs md:text-sm leading-snug md:leading-relaxed opacity-90 line-clamp-3 md:line-clamp-none">
                          {inv.description}
                        </p>
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/30 blur-2xl pointer-events-none" />
                      </div>
                    </Card>
                  );
                }
                return (
                  <Card
                    key={inv.name}
                    className="p-7 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(145deg, #0a0a12 0%, #1a1a24 50%, #050508 100%)",
                      borderColor: "rgba(255,255,255,0.12)",
                      boxShadow:
                        "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="relative h-full flex flex-col text-white">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/15">
                          <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                        </div>
                        <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                          Tradicional
                        </span>
                      </div>
                      <h3 className="font-display text-3xl mb-2 text-white">{inv.name}</h3>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-2xl font-bold text-white">{inv.monthly}</span>
                        <span className="text-sm text-white/50">/ {inv.yearly}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/70">
                        {inv.description}
                      </p>
                      <div className="absolute -top-16 -left-10 w-40 h-40 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonCardSwap;
