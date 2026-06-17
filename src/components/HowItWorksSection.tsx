import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Você Investe",
    desc: "Escolha sua faixa de investimento e assine o contrato de 24 meses.",
  },
  {
    n: "02",
    title: "A Gente Trabalha",
    desc: "Nossa equipe opera no Forex, gerencia parcerias e o microcrédito estruturado.",
  },
  {
    n: "03",
    title: "Você Recebe",
    desc: "Rentabilidade mensal de 5% depositada todo mês.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-20 md:py-28" style={{ background: "#000005" }}>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
            Como <span className="gold-text">Funciona?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#A8B8C8]">
            Simples, transparente e lucrativo.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting dashed line (desktop) */}
          <svg
            className="hidden md:block absolute top-12 left-0 right-0 mx-auto pointer-events-none"
            style={{ width: "75%", height: "4px" }}
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0"
              y1="2"
              x2="1000"
              y2="2"
              stroke="#D4A843"
              strokeWidth="2"
              strokeDasharray="10 8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>

          <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative z-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center font-display text-3xl mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, #A07830 0%, #F5D87A 50%, #D4A843 100%)",
                    color: "#020B18",
                    boxShadow:
                      "0 10px 30px rgba(212,168,67,0.45), inset 0 -4px 10px rgba(0,0,0,0.25), inset 0 3px 8px rgba(255,255,255,0.4)",
                  }}
                >
                  {s.n}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-[#A8B8C8] max-w-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
