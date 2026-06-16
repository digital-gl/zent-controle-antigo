import { motion } from "framer-motion";

const items = [
  { name: "Ricardo M.", role: "Empresário, SP", text: "Em oito meses como sócio, o retorno superou qualquer aplicação tradicional que eu tinha. Transparência impressionante." },
  { name: "Camila R.", role: "Médica, RJ", text: "Eu queria fazer o dinheiro render sem virar trader. A The W resolveu isso de forma profissional." },
  { name: "André L.", role: "Investidor, MG", text: "A gestão de risco é o que mais me chamou atenção. Não é promessa de milagre, é operação séria." },
];

const DepoimentosSection = () => {
  return (
    <section className="bg-dark-linear py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl gold-text text-center mb-14"
        >
          Sócios que escolheram a The W.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="liquid-glass rounded-2xl p-7"
            >
              <p className="text-[#F0F4F8] text-base leading-relaxed mb-5 italic">"{t.text}"</p>
              <footer className="text-[#F5D87A] text-sm font-semibold">
                {t.name}
                <span className="block text-[#A8B8C8] text-xs font-normal">{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepoimentosSection;
