import { useState } from 'react';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const faqs = [
  { q: 'Isso é para mim se eu já fiz terapia?', a: 'Sim. A maioria das pessoas que fazem o diagnóstico já passaram por terapia convencional. O método da Porta Neural trabalha em uma camada que a terapia tradicional normalmente não acessa.' },
  { q: 'Preciso ter algum conhecimento prévio?', a: 'Nenhum. O diagnóstico é guiado e estruturado para qualquer pessoa entender. Você segue o processo e recebe o resultado.' },
  { q: 'Quanto tempo leva para fazer o diagnóstico?', a: 'O diagnóstico pode ser concluído em uma sessão. Você tem acesso vitalício para revisitar quando quiser.' },
  { q: 'Isso tem relação com religião?', a: 'O método é desenvolvido para pessoas que têm fé, mas não depende de denominação. Lucas trabalha com a integração entre mente e espiritualidade de forma respeitosa e não dogmática.' },
  { q: 'Como vou receber o acesso?', a: 'Imediatamente após a confirmação do pagamento. Você recebe o acesso por e-mail em menos de dois minutos.' },
];

const FAQSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 8);
  const titleClass = getTitleClass(theme, 8);
  const isWhite = false; // index 8 = even = dark
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 gold-text">
          Perguntas frequentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg gold-border overflow-hidden" style={{ background: 'linear-gradient(145deg, #041628 0%, #0A3060 100%)' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between"
              >
                <span className="text-[#F0F4F8] font-medium text-base sm:text-lg pr-4">{faq.q}</span>
                <span className="gold-text text-xl shrink-0 transition-transform duration-300" style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === i ? '200px' : '0', opacity: openIndex === i ? 1 : 0 }}
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
