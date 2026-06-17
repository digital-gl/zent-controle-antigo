import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, Users, Wallet, BadgeDollarSign, Repeat } from "lucide-react";

const CountUp = ({ to, prefix = "", suffix = "", duration = 1400 }: { to: number; prefix?: string; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
};

const ReferralProgramSection = ({ embedded = false }: { embedded?: boolean }) => {
  const Wrapper: any = embedded ? "div" : "section";
  const wrapperProps = embedded
    ? { className: "relative mt-16" }
    : {
        className: "relative py-20 md:py-28 overflow-hidden",
        style: {
          background: "#000D30",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(212,168,67,0.04) 0px, rgba(212,168,67,0.04) 1px, transparent 1px, transparent 18px)",
        },
      };
  return (
    <Wrapper {...wrapperProps}>
      <style>{`
        @keyframes ref-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ref-spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .ref-float { animation: ref-float 3s ease-in-out infinite; display:inline-block; }
        .ref-spin { animation: ref-spin 6s linear infinite; display:inline-block; }
      `}</style>

      <div className={embedded ? "relative z-10" : "container mx-auto px-4 max-w-6xl relative z-10"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
            Ganhe Indicando. <span className="gold-text">Renda Passiva Infinita</span>
          </h2>
          <p className="text-lg text-[#A8B8C8]">
            Cada pessoa que você indicar se torna renda para você para sempre.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-14">
          {[
            {
              big: 10,
              suffix: "%",
              prefix: "",
              label: "DE COMISSÃO DIRETA",
              desc: "Sobre o primeiro aporte do seu indicado, recebida imediatamente.",
              icon: "💸",
              iconClass: "ref-float",
            },
            {
              big: 1,
              suffix: "%",
              prefix: "+",
              label: "AO MÊS, PARA SEMPRE",
              desc: "Sobre o volume total investido por todos os seus indicados ativos.",
              icon: "🔄",
              iconClass: "ref-spin",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="liquid-glass rounded-2xl p-8 text-center"
              style={{
                border: "1.5px solid rgba(245,216,122,0.35)",
                boxShadow: "0 0 30px rgba(245,216,122,0.15)",
              }}
            >
              <div className={`text-6xl mb-4 ${card.iconClass}`}>{card.icon}</div>
              <div
                className="gold-text font-display leading-none mb-3"
                style={{ fontSize: "clamp(56px, 9vw, 80px)" }}
              >
                <CountUp to={card.big} prefix={card.prefix} suffix={card.suffix} />
              </div>
              <div className="text-[#F5D87A] tracking-widest text-xs md:text-sm font-bold mb-3">
                {card.label}
              </div>
              <p className="text-[#A8B8C8] max-w-sm mx-auto">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-center">
            {[
              { t: "Você", Icon: User },
              { t: "Indica amigo", Icon: Users },
              { t: "Amigo investe", Icon: Wallet },
              { t: "Você recebe 10%", Icon: BadgeDollarSign },
              { t: "+1% todo mês", Icon: Repeat },
            ].map((s, i, arr) => (
              <div key={i} className="flex items-center gap-3 md:gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="rounded-xl px-3 md:px-4 py-3 min-w-[110px] flex flex-col items-center"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    border: "1px solid rgba(245,216,122,0.4)",
                  }}
                >
                  <s.Icon size={26} color="#F5D87A" strokeWidth={1.75} className="mb-1" />
                  <div className="text-white text-xs md:text-sm font-semibold">{s.t}</div>
                </motion.div>
                {i < arr.length - 1 && (
                  <motion.svg
                    width="28"
                    height="14"
                    viewBox="0 0 28 14"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                  >
                    <motion.path
                      d="M0 7 L24 7 M18 1 L24 7 L18 13"
                      stroke="#F5D87A"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: i * 0.15 + 0.1 }}
                    />
                  </motion.svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralProgramSection;
