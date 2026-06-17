import { motion } from "framer-motion";

const stats = [
  { value: "CNPJ", suffix: "Ativo", icon: "✓" },
  { value: "24", suffix: "Meses de contrato" },
  { value: "4", suffix: "Fontes de receita" },
  { value: "5%", suffix: "ao mês" },
];

const CompanyTrustSection = () => {
  return (
    <section
      className="w-full py-10 md:py-14"
      style={{
        background:
          "linear-gradient(90deg, #A07830 0%, #F5D87A 50%, #A07830 100%)",
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className="font-display text-2xl md:text-4xl leading-none mb-1 flex items-center gap-2"
                style={{ color: "#020B18" }}
              >
                {s.icon && <span className="text-3xl md:text-4xl">{s.icon}</span>}
                {s.value}
              </div>
              <div
                className="text-xs md:text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#3A2A08" }}
              >
                {s.suffix}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyTrustSection;
