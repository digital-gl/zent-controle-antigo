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
  <section id="sintomas" className="py-24 sm:py-32 bg-background relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
          O SEU PASSADO NÃO RESOLVIDO É A SUA{" "}
          <span className="text-cyber">PRISÃO NO PRESENTE.</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Se a sua Porta Neural está fechada, você não está no comando; você está apenas a reagir ao peso do que ficou trancado. O seu corpo envia os sinais:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="glass-strong rounded-glass p-8 hover:scale-[1.02] transition-all duration-300 group gold-border-subtle"
          >
            <div className="w-16 h-16 rounded-full bg-cyber flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <card.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
