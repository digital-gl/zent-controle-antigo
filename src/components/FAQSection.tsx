import { useState } from 'react';
import { useTheme, getSectionBg } from '@/contexts/ThemeContext';

const faqs = [
  { q: 'Como recebo o acesso?', a: 'Imediatamente após a confirmação do pagamento, todo o material é enviado para o seu e-mail.' },
  { q: 'Isso é algum tipo de terapia longa?', a: 'Não. É uma auditoria técnica. Não vamos passar meses falando do seu passado. Vamos identificar a trava subconsciente e ensinar-lhe o caminho biológico para reabrir a porta.' },
  { q: 'Quanto tempo leva para aplicar?', a: 'O protocolo foi desenhado para a agenda de um líder de alto nível. Você consome e aplica em poucos minutos.' },
  { q: 'E se a minha religião não permitir hipnose?', a: 'A Hipnose Clínica e a PNL utilizadas no protocolo são puramente científicas e biológicas, voltadas para o foco e a neuroplasticidade. Não envolvem misticismo, respeitando integralmente as suas convicções religiosas.' },
];

const FAQSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 8);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 gold-text">
          PERGUNTAS FREQUENTES
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg gold-border overflow-hidden bg-card-dark">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between"
              >
                <span className="text-[#F0F4F8] font-medium text-base sm:text-lg pr-4">{faq.q}</span>
                <span className="gold-text text-xl shrink-0 transition-transform duration-300" style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === i ? '300px' : '0', opacity: openIndex === i ? 1 : 0 }}
              >
                <p className="px-6 pb-4 text-[#A8B8C8] text-sm sm:text-base leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
