import { Quote } from "lucide-react";

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
  <section id="resultados" className="py-24 sm:py-32 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
          LÍDERES QUE REABRIRAM{" "}
          <span className="text-cyber">A PORTA.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="glass-strong rounded-glass p-8 flex flex-col gold-border-subtle">
            <Quote className="w-8 h-8 text-cyber/40 mb-6" />
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic">"{t.text}"</p>
            <div className="mt-6 pt-4 border-t border-border/20">
              <p className="font-bold text-foreground">{t.name}</p>
              <p className="text-xs text-cyber">{t.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg sm:text-xl italic text-cyber/80 max-w-2xl mx-auto">
          "A clareza que este diagnóstico me trouxe vale cem vezes o investimento. Eu finalmente joguei luz no que me travava no escuro."
        </p>
      </div>
    </div>
  </section>
);
