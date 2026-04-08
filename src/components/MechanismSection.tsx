import { Target, Zap, Brain } from "lucide-react";

const steps = [
  { icon: Target, label: "Identificar", desc: "A trava subconsciente", color: "bg-brutal-sage" },
  { icon: Zap, label: "Desmontar", desc: "O curto-circuito emocional", color: "bg-brutal-yellow" },
  { icon: Brain, label: "Religar", desc: "O governo executivo", color: "bg-white" },
];

export const MechanismSection = () => (
  <section id="metodo" className="py-20 sm:py-28 bg-brutal-charcoal relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter mb-8 font-heading">
            O ERRO NÃO É DE ESTRATÉGIA.{" "}
            <span className="text-brutal-yellow">É DE HARDWARE.</span>
          </h2>
          <div className="space-y-5 text-brutal-sage leading-relaxed">
            <p>
              Para construir o que tem hoje, você aguentou pancadas que poucos suportariam.
              Para te proteger, o seu sistema nervoso acionou um disjuntor de segurança e fechou a sua Porta Neural.
            </p>
            <p>
              O problema é que traumas, traições e pressões não superadas ficaram trancados lá dentro,
              operando como um vírus no seu subconsciente.
            </p>
            <p className="text-white font-bold text-lg">
              Você precisa de <span className="text-brutal-yellow">Sinergia</span> — um protocolo técnico para realizar uma varredura mental,
              identificar o curto-circuito e religar a chave do seu governo executivo.
            </p>
          </div>
        </div>

        {/* How it works - 3 steps */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-6">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 ${step.color} rounded-xl border-brutal shadow-brutal flex items-center justify-center shrink-0`}>
                <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-brutal-charcoal" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brutal-sage font-bold mb-1">Passo {i + 1}</p>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tighter font-heading">{step.label}</h4>
                <p className="text-sm text-brutal-sage/80">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden" />
              )}
            </div>
          ))}
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-[calc(50%+2.5rem)] top-[calc(50%-6rem)] w-0.5 h-48 bg-brutal-dark" />
        </div>
      </div>
    </div>
  </section>
);
