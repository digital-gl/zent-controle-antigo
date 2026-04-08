import { Check, ArrowRight, Shield } from "lucide-react";

const benefits = [
  "O Protocolo de Diagnóstico: O guia prático para identificar a trava.",
  "O Mapeamento de Padrões: Como expor os seus autossabotadores invisíveis.",
  "Aulas de Sinergia Mental: A base da PNL e Hipnose para preparar o reset.",
];

export const OfferSection = () => (
  <section id="oferta" className="py-24 sm:py-32 bg-background relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyber/5 blur-[200px]" />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="glass-strong rounded-glass p-8 sm:p-12 lg:p-16 gold-border-subtle text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
          O MAPA DA SUA LIBERTAÇÃO POR APENAS{" "}
          <span className="text-cyber">R$ 49.</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Você está a um passo de descobrir exatamente o que está trancado no seu subconsciente.
        </p>

        <div className="text-left max-w-lg mx-auto mb-10 space-y-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-cyber font-bold mb-6">
            O que você recebe com acesso imediato:
          </p>
          {benefits.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyber flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <p className="text-muted-foreground line-through text-lg mb-2">De R$ 197,00</p>
          <p className="text-5xl sm:text-7xl font-bold text-cyber tracking-tight">R$ 49,00</p>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-3 bg-cyber text-primary-foreground px-10 sm:px-14 py-5 sm:py-6 rounded-full text-lg sm:text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl"
        >
          QUERO ACESSAR MEU DIAGNÓSTICO AGORA
          <ArrowRight className="w-6 h-6" />
        </a>
      </div>
    </div>
  </section>
);
