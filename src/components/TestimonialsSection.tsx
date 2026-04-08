import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos M.",
    role: "Aluno da Mentoria",
    text: "Em 3 meses de mentoria, já estou operando com consistência. O método Smart Money mudou minha forma de ver o mercado.",
  },
  {
    name: "Ana P.",
    role: "Sócia-Investidora",
    text: "Comecei com R$ 500 e hoje meus rendimentos mensais superam qualquer aplicação tradicional. Recomendo de olhos fechados.",
  },
  {
    name: "Roberto S.",
    role: "Aluno e Investidor",
    text: "A transparência é o diferencial. Acompanho tudo pelo app diariamente. Já indiquei para toda minha família.",
  },
];

export const TestimonialsSection = () => (
  <section id="resultados" className="py-20 sm:py-28 bg-card">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold gradient-gold-text mb-4">Resultados e Testemunhos</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Veja o que nossos alunos e sócios dizem sobre a experiência
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="gold-border-frame p-6 bg-background flex flex-col">
            <Quote className="w-8 h-8 text-gold/40 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic">"{t.text}"</p>
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-bold text-foreground">{t.name}</p>
              <p className="text-xs text-gold">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
