import { motion } from "framer-motion";

const WASHINGTON = "https://i.imgur.com/IPOseke.jpeg";

const credentials = [
  "Mais de uma década operando o mercado financeiro",
  "Fundador da The W Consultoria e Tecnologia",
  "Mentor de centenas de traders e investidores",
  "Especialista em gestão de risco e tecnologia aplicada",
];

const AutoridadeSection = () => {
  return (
    <section id="autoridade" className="bg-dark-radial py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto md:mx-0 w-[260px] sm:w-[320px]"
        >
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#0113B7]/30 to-[#D4A843]/30 blur-2xl" />
          <img
            src={WASHINGTON}
            alt="Washington"
            loading="lazy"
            decoding="async"
            className="relative w-full aspect-[4/5] object-cover rounded-3xl border-2 border-[#D4A843]/60 shadow-[0_0_30px_rgba(212,168,67,0.3)]"
          />
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#F5D87A] text-xs uppercase tracking-widest mb-3 font-semibold"
          >
            Quem está à frente
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl gold-text mb-5"
          >
            Washington, fundador da The W.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[#F0F4F8] text-base md:text-lg leading-relaxed mb-6"
          >
            Trader e empresário, Washington construiu a The W para unir o que faltava no mercado brasileiro: operação profissional, gestão de risco rígida e tecnologia que entrega previsibilidade ao investidor.
          </motion.p>
          <ul className="space-y-2">
            {credentials.map((c, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex gap-3 text-[#A8B8C8] text-sm"
              >
                <span className="text-[#F5D87A]">›</span>
                {c}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AutoridadeSection;
