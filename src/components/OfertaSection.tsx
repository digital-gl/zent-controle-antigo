import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Component as EtherealShadow } from "./ui/etheral-shadow";

const benefits = [
  "Operação profissional do seu capital pela mesa The W",
  "Mesma estratégia executada com o capital da casa",
  "Relatórios mensais e dashboard ao vivo",
  "Gestão de risco institucional e regras transparentes",
  "Suporte direto com o time de gestão",
];

const WHATSAPP_URL =
  "https://wa.me/558399617709?text=" +
  encodeURIComponent("Olá, quero ser um sócio investidor!");

const OfertaSection = () => {
  return (
    <section id="oferta" className="relative overflow-hidden py-20 px-4 md:px-8" style={{ background: "#000005" }}>
      <div className="absolute inset-0 pointer-events-none">
        <EtherealShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 0.5, scale: 1.2 }}
          sizing="fill"
        />
      </div>
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden p-8 md:p-12 text-center"
          style={{
            borderRadius: "28px",
            border: "2px solid rgba(245, 216, 122, 0.85)",
            background: "rgba(0, 13, 48, 0.72)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            boxShadow:
              "0 0 34px rgba(245, 216, 122, 0.5), 0 6px 26px rgba(212, 168, 67, 0.38), inset 0 0 28px rgba(245, 216, 122, 0.08)",
          }}
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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
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

