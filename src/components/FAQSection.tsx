import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Como recebo o acesso?",
    a: "Imediatamente após a confirmação do pagamento, todo o material é enviado para o seu e-mail.",
  },
  {
    q: "Isso é algum tipo de terapia longa?",
    a: "Não. É uma auditoria técnica. Não vamos passar meses falando do seu passado. Vamos identificar a trava subconsciente e ensinar-lhe o caminho biológico para reabrir a porta.",
  },
  {
    q: "Quanto tempo leva para aplicar?",
    a: "O protocolo foi desenhado para a agenda de um líder de alto nível. Você consome e aplica em poucos minutos.",
  },
  {
    q: "E se a minha religião não permitir hipnose?",
    a: "A Hipnose Clínica e a PNL utilizadas no protocolo são puramente científicas e biológicas, voltadas para o foco e a neuroplasticidade. Não envolvem misticismo, respeitando integralmente as suas convicções cristãs e o seu mandato de Governo.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-12 text-center">
          PERGUNTAS <span className="text-cyber">FREQUENTES</span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="glass-strong rounded-glass overflow-hidden gold-border-subtle"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-base sm:text-lg font-bold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-cyber shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-60 pb-6" : "max-h-0"
                }`}
              >
                <p className="px-6 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
