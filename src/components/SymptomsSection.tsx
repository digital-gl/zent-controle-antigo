import { Cog, TrendingUp, Car } from "lucide-react";

const cards = [
  {
    icon: Cog,
    title: "A Decisão Corrompida",
    text: "Você hesita em decisões simples. Sabe exatamente o que deve fazer, mas uma força invisível te trava ou te empurra para o caminho mais \"seguro\" e menos lucrativo.",
  },
  {
    icon: TrendingUp,
    title: "O Teto de Vidro Emocional",
    text: "Toda vez que a empresa atinge um pico de sucesso, você, subconscientemente, cria um problema. Um atrito com um sócio, um gasto desnecessário. O sucesso tornou-se um gatilho de estresse.",
  },
  {
    icon: Car,
    title: "A Solidão Blindada",
    text: "Você chega em casa, mas não consegue \"desligar\" o modo de guerra. Você tornou-se insensível e impaciente. A armadura que te protege no mercado está sufocando a sua família.",
  },
];

export const SymptomsSection = () => (
  <section id="sintomas" className="py-20 sm:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brutal-charcoal tracking-tighter mb-6 font-heading">
          O SEU PASSADO NÃO RESOLVIDO É A SUA{" "}
          <span className="bg-brutal-yellow px-2">PRISÃO NO PRESENTE.</span>
        </h2>
        <p className="text-base sm:text-lg text-brutal-charcoal/70 leading-relaxed">
          Se a sua Porta Neural está fechada, você não está no comando; você está apenas a reagir ao peso do que ficou trancado. O seu corpo envia os sinais:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-brutal-yellow border-brutal rounded-xl p-8 shadow-brutal-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal transition-all duration-200"
          >
            <div className="w-14 h-14 bg-brutal-charcoal rounded-lg border-brutal flex items-center justify-center mb-6">
              <card.icon className="w-7 h-7 text-brutal-yellow" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-brutal-charcoal tracking-tighter mb-4 font-heading">{card.title}</h3>
            <p className="text-sm text-brutal-charcoal/70 leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
