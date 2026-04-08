import { Star } from "lucide-react";

const testimonials = [
  {
    text: "A clareza que este diagnóstico me trouxe vale cem vezes o investimento. Eu finalmente joguei luz no que me travava no escuro.",
    name: "C.R.",
    role: "CEO, Setor Financeiro",
  },
  {
    text: "Achei que era burnout, mas era algo muito mais profundo. O protocolo me mostrou exatamente onde estava o curto-circuito.",
    name: "M.A.",
    role: "Empresário, 15 anos de mercado",
  },
  {
    text: "Minha relação com a família mudou em semanas. Eu não sabia que a armadura do trabalho estava me sufocando em casa.",
    name: "R.S.",
    role: "Diretor Executivo",
  },
];

export const TestimonialsSection = () => (
  <section className="py-20 sm:py-28 bg-brutal-sage">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brutal-charcoal tracking-tighter font-heading">
          LÍDERES QUE REABRIRAM A PORTA.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white border-brutal p-8 shadow-brutal-lg"
            style={{ borderRadius: '2px 24px 2px 24px' }}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#ffbc2e] text-[#ffbc2e]" />
              ))}
            </div>
            <p className="text-brutal-charcoal/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
            <div className="border-t-2 border-black pt-4">
              <p className="font-extrabold text-brutal-charcoal font-heading">{t.name}</p>
              <p className="text-xs text-brutal-charcoal/60 font-bold uppercase tracking-wider">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
