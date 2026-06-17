import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

const compound = (principal: number, monthlyRate: number, months: number) =>
  principal * Math.pow(1 + monthlyRate, months);

const getTheWRate = (_amount: number) => 0.05;

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: (i * 0.4) % 8,
  duration: 8 + ((i * 1.3) % 6),
  size: 2 + ((i * 7) % 4),
}));

const CountUp = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 700;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + diff * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{formatBRL(display)}</>;
};

const InvestmentCalculator = () => {
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(12);

  const data = useMemo(() => {
    const poup = compound(amount, 0.005, months);
    const cdi = compound(amount, 0.01, months);
    const wRate = getTheWRate(amount);
    const tw = compound(amount, wRate, months);
    return {
      poup,
      cdi,
      tw,
      wRate,
      poupProfit: poup - amount,
      cdiProfit: cdi - amount,
      twProfit: tw - amount,
      diff: tw - amount - (poup - amount),
    };
  }, [amount, months]);

  const max = Math.max(data.poup, data.cdi, data.tw);
  const h = (v: number) => `${Math.max(8, (v / max) * 100)}%`;

  const sliderStyle = `
    .gold-range {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      border-radius: 999px;
      outline: none;
    }
    .gold-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F5D87A, #D4A843, #A07830);
      border: 2px solid #F5D87A;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(245,216,122,0.7);
    }
    .gold-range::-moz-range-thumb {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: linear-gradient(135deg, #F5D87A, #D4A843, #A07830);
      border: 2px solid #F5D87A;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(245,216,122,0.7);
    }
    @keyframes particle-rise {
      0% { transform: translateY(0); opacity: 0; }
      15% { opacity: 1; }
      85% { opacity: 1; }
      100% { transform: translateY(-100vh); opacity: 0; }
    }
  `;

  const trackBg = (pct: number) =>
    `linear-gradient(90deg, #D4A843 0%, #F5D87A ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`;

  const amtPct = ((amount - 1000) / (100000 - 1000)) * 100;
  const monthPct = ((months - 1) / (60 - 1)) * 100;

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "#071228" }}
    >
      <style>{sliderStyle}</style>

      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              bottom: "-10px",
              left: p.left,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "#F5D87A",
              boxShadow: "0 0 6px rgba(245,216,122,0.8)",
              animation: `particle-rise ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Simule Seu <span className="gold-text">Rendimento</span>
          </h2>
          <p className="text-lg text-[#A8B8C8]">
            Veja quanto seu dinheiro pode render com The W vs os outros
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT — Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-2xl p-6 md:p-8"
            style={{ border: "1.5px solid rgba(245,216,122,0.4)" }}
          >
            <div className="mb-8">
              <label className="block text-[#A8B8C8] uppercase tracking-wider text-xs mb-3">
                Quanto você quer investir?
              </label>
              <div
                className="flex items-center rounded-xl px-4 py-3 mb-4"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(212,168,67,0.3)",
                }}
              >
                <span className="gold-text font-display text-2xl mr-2">R$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount.toLocaleString("pt-BR")}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const n = Math.min(100000, Math.max(0, parseInt(raw || "0", 10)));
                    setAmount(n);
                  }}
                  className="bg-transparent flex-1 text-white text-3xl font-display outline-none w-full"
                />
              </div>
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={Math.max(1000, amount)}
                onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                className="gold-range"
                style={{ background: trackBg(amtPct) }}
              />
              <div className="flex justify-between text-xs text-[#607080] mt-2">
                <span>R$ 1.000</span>
                <span>R$ 100.000</span>
              </div>
            </div>

            <div>
              <label className="block text-[#A8B8C8] uppercase tracking-wider text-xs mb-3">
                Por quantos meses?
              </label>
              <div className="text-center mb-4">
                <span className="gold-text font-display text-5xl">{months}</span>
                <span className="text-[#A8B8C8] ml-2 text-lg">
                  {months === 1 ? "mês" : "meses"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={60}
                step={1}
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value, 10))}
                className="gold-range"
                style={{ background: trackBg(monthPct) }}
              />
              <div className="flex justify-between text-xs text-[#607080] mt-2">
                <span>1 mês</span>
                <span>60 meses</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Poupança */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(40,50,65,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#A8B8C8] text-sm">Poupança</span>
                <span className="text-[#607080] text-xs">0,5% / mês</span>
              </div>
              <div className="text-white text-2xl font-display">
                <CountUp value={Math.round(data.poup)} />
              </div>
              <div className="text-red-300/80 text-sm">
                Lucro: <CountUp value={Math.round(data.poupProfit)} />
              </div>
            </div>

            {/* CDI */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(0,42,144,0.25)",
                border: "1px solid rgba(1,19,183,0.4)",
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#A8B8C8] text-sm">Renda Fixa CDI</span>
                <span className="text-[#607080] text-xs">1% / mês</span>
              </div>
              <div className="text-white text-2xl font-display">
                <CountUp value={Math.round(data.cdi)} />
              </div>
              <div className="text-yellow-300/90 text-sm">
                Lucro: <CountUp value={Math.round(data.cdiProfit)} />
              </div>
            </div>

            {/* The W */}
            <div
              className="rounded-xl p-6 relative"
              style={{
                background:
                  "linear-gradient(145deg, rgba(212,168,67,0.12), rgba(0,13,48,0.6))",
                border: "1.5px solid rgba(245,216,122,0.7)",
                boxShadow:
                  "0 0 35px rgba(245,216,122,0.35), inset 0 0 20px rgba(245,216,122,0.05)",
                transform: "scale(1.02)",
              }}
            >
              <div
                className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #F5D87A, #D4A843)",
                  color: "#020B18",
                }}
              >
                <Sparkles size={12} color="#020B18" strokeWidth={2.5} className="inline mr-1 -mt-0.5" />
                MELHOR OPÇÃO
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-white text-sm font-semibold">
                  The W Consultoria
                </span>
                <span className="gold-text text-xs font-bold">
                  {(data.wRate * 100).toFixed(0)}% / mês
                </span>
              </div>
              <div className="gold-text text-3xl md:text-4xl font-display">
                <CountUp value={Math.round(data.tw)} />
              </div>
              <div className="text-[#F5D87A] text-sm font-semibold">
                Lucro: <CountUp value={Math.round(data.twProfit)} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 liquid-glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-end justify-around gap-4 md:gap-8 h-56 md:h-64">
            {[
              { label: "Poupança", v: data.poup, color: "linear-gradient(180deg, #4B5563, #6B7280)", text: "text-[#A8B8C8]" },
              { label: "CDI", v: data.cdi, color: "linear-gradient(180deg, #001A5E, #0113B7)", text: "text-white" },
              { label: "The W", v: data.tw, color: "linear-gradient(180deg, #A07830, #F5D87A)", text: "gold-text", glow: true },
            ].map((b) => (
              <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className={`text-xs md:text-sm mb-2 font-semibold ${b.text}`}>
                  {formatBRL(Math.round(b.v))}
                </div>
                <div
                  className="w-full rounded-t-lg transition-all duration-700 ease-out"
                  style={{
                    height: h(b.v),
                    background: b.color,
                    boxShadow: b.glow ? "0 0 25px rgba(245,216,122,0.6)" : "none",
                  }}
                />
                <div className="text-xs md:text-sm text-[#A8B8C8] mt-2">{b.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Diff statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-[#A8B8C8] text-base md:text-lg mb-3">
            Com {formatBRL(amount)} em {months} {months === 1 ? "mês" : "meses"}:
          </p>
          <p className="font-display text-3xl md:text-5xl mb-8">
            <span className="text-white">A diferença é de </span>
            <span className="gold-text">
              <CountUp value={Math.round(data.diff)} />
            </span>
          </p>
          <a href="#" className="cta-button text-base md:text-lg">
            Quero esse rendimento
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
