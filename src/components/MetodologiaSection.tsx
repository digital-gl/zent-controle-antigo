import { motion } from "framer-motion";
import ReferralProgramSection from "./ReferralProgramSection";


const steps = [
  { n: "01", title: "Diagnóstico", text: "Entendemos seu perfil, objetivo e capital disponível para sociedade." },
  { n: "02", title: "Contrato", text: "Sociedade formalizada com regras claras de aporte, retirada e gestão de risco." },
  { n: "03", title: "Operação", text: "Nossa mesa opera seu capital junto ao da casa, com a mesma estratégia." },
  { n: "04", title: "Acompanhamento", text: "Relatórios mensais, dashboard ao vivo e suporte direto com a gestão." },
];

const MetodologiaSection = () => {
  return (
    <section id="metodologia" className="bg-dark-alt2 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl gold-text text-center mb-14"
        >
          Como funciona a sociedade.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="liquid-glass rounded-2xl p-6 relative"
            >
              <div className="font-display text-5xl gold-text mb-3 opacity-80">{s.n}</div>
              <h3 className="font-display text-xl text-[#F0F4F8] mb-2">{s.title}</h3>
              <p className="text-[#A8B8C8] text-sm leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetodologiaSection;
