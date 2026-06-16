import { motion } from "framer-motion";

const stats = [
  { value: "+12,4%", label: "Rentabilidade média mensal histórica" },
  { value: "850+", label: "Sócios investidores ativos" },
  { value: "7 anos", label: "De atuação no mercado financeiro" },
  { value: "R$ 84M", label: "Em capital sob operação" },
];

const ResultadosSection = () => {
  return (
    <section id="resultados" className="bg-dark-alt1 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl gold-text text-center mb-4"
        >
          Resultados que falam por si.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-[#A8B8C8] text-center max-w-2xl mx-auto mb-14"
        >
          Performance auditada, operação transparente e sócios que crescem junto com a mesa.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="liquid-glass rounded-2xl p-6 text-center"
            >
              <div className="font-display text-3xl md:text-4xl gold-text mb-2">{s.value}</div>
              <div className="text-[#A8B8C8] text-xs sm:text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultadosSection;
