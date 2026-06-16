import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ParallaxStars from "./ParallaxStars";

const benefits = [
  "Operação profissional do seu capital pela mesa The W",
  "Mesma estratégia executada com o capital da casa",
  "Relatórios mensais e dashboard ao vivo",
  "Gestão de risco institucional e regras transparentes",
  "Suporte direto com o time de gestão",
];

const OfertaSection = () => {
  return (
    <section id="oferta" className="relative overflow-hidden bg-dark-alt3 py-20 px-4 md:px-8">
      <ParallaxStars speed={0.5} className="opacity-50" />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-3xl p-8 md:p-12 text-center gold-border-strong"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#22C55E]/20 text-[#86EFAC] text-[11px] uppercase tracking-widest font-semibold mb-5">
            Vagas limitadas
          </span>
          <h2 className="font-display text-4xl md:text-5xl gold-text mb-4">
            Torne-se sócio investidor da The W.
          </h2>
          <p className="text-[#F0F4F8] text-base md:text-lg leading-relaxed mb-8">
            Acesso ao contrato de sociedade, à mesa de operação e ao acompanhamento mensal. Capital mínimo de aporte definido em onboarding.
          </p>

          <ul className="text-left space-y-3 mb-10 max-w-md mx-auto">
            {benefits.map((b, i) => (
              <li key={i} className="flex gap-3 text-[#F0F4F8] text-sm">
                <Check className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="cta-button-green w-full sm:w-auto inline-block text-sm sm:text-base"
          >
            Quero Ser Sócio Investidor
          </a>
          <p className="text-[#A8B8C8] text-xs mt-5">
            Após o cadastro, nosso time entra em contato para o onboarding e a formalização.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OfertaSection;
