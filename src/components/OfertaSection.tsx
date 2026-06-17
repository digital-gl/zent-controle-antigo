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
          <div className="flex justify-center mb-6">
            <img
              src="https://i.imgur.com/mA7WzCc.png"
              alt="The W Consultoria e Tecnologia"
              loading="lazy"
              className="h-16 md:h-20 w-auto"
            />
          </div>

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
            className="cta-button-green w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-base text-center whitespace-nowrap"
          >
            <svg viewBox="0 0 32 32" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
              <path
                fill="currentColor"
                d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26 0 1.33.97 2.62 1.11 2.8.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32z"
              />
              <path
                fill="currentColor"
                d="M26.65 5.33A14.86 14.86 0 0 0 16.02.92C7.83.92 1.18 7.57 1.17 15.75c0 2.61.68 5.17 1.98 7.42L1.05 31.08l8.09-2.12a14.9 14.9 0 0 0 7.12 1.81h.01c8.18 0 14.84-6.65 14.85-14.83a14.75 14.75 0 0 0-4.47-10.6zM16.27 28.26h-.01a12.34 12.34 0 0 1-6.29-1.72l-.45-.27-4.8 1.26 1.28-4.68-.29-.47a12.33 12.33 0 0 1-1.89-6.58c0-6.81 5.55-12.35 12.36-12.35 3.3 0 6.4 1.29 8.73 3.62a12.27 12.27 0 0 1 3.62 8.74c0 6.81-5.55 12.35-12.36 12.35z"
              />
            </svg>
            <span>Quero Ser Sócio Investidor</span>
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

