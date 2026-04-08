import { Zap, Brain, Target } from "lucide-react";

export const MechanismSection = () => (
  <section id="metodo" className="py-24 sm:py-32 bg-background relative overflow-hidden">
    {/* Subtle background element */}
    <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-cyber/5 blur-[120px] -translate-y-1/2" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-8">
            O ERRO NÃO É DE ESTRATÉGIA.{" "}
            <span className="text-cyber">É DE HARDWARE.</span>
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Para construir o que tem hoje, você aguentou pancadas que poucos suportariam. 
              Para te proteger, o seu sistema nervoso acionou um disjuntor de segurança e fechou a sua Porta Neural.
            </p>
            <p>
              O problema é que traumas, traições e pressões não superadas ficaram trancados lá dentro, 
              operando como um vírus no seu subconsciente. Você não precisa de mais motivação ou de outro curso de gestão.
            </p>
            <p className="text-foreground font-medium text-lg">
              Você precisa de <span className="text-cyber font-bold">Sinergia</span> — um protocolo técnico para realizar uma varredura mental, 
              identificar o curto-circuito e religar a chave do seu governo executivo.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="glass-strong rounded-glass p-8 sm:p-12 float-animation">
            <div className="space-y-8">
              {[
                { icon: Target, label: "Identificar", desc: "A trava subconsciente" },
                { icon: Zap, label: "Desmontar", desc: "O curto-circuito emocional" },
                { icon: Brain, label: "Religar", desc: "O governo executivo" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-cyber flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-cyber font-bold">Passo {i + 1}</span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{step.label}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
