import { Check, ArrowRight } from "lucide-react";

const benefits = [
  "O Protocolo de Diagnóstico: O guia prático para identificar a trava.",
  "O Mapeamento de Padrões: Como expor os seus autossabotadores invisíveis.",
  "Aulas de Sinergia Mental: A base da PNL e Hipnose para preparar o reset.",
];

export const OfferSection = () => (
  <section id="oferta" className="py-20 sm:py-28 bg-white relative">
    <div className="absolute inset-0 dot-pattern pointer-events-none" />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="bg-brutal-charcoal border-brutal rounded-xl shadow-brutal-xl p-8 sm:p-12 lg:p-16 text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter font-heading mb-6">
          O MAPA DA SUA LIBERTAÇÃO POR APENAS{" "}
          <span className="text-brutal-yellow">R$ 49.</span>
        </h2>
        <p className="text-brutal-sage text-lg mb-10 max-w-2xl mx-auto">
          Você está a um passo de descobrir exatamente o que está trancado no seu subconsciente.
        </p>

        <div className="text-left max-w-lg mx-auto mb-10 space-y-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brutal-yellow font-bold mb-6">
            O que você recebe com acesso imediato:
          </p>
          {benefits.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brutal-yellow rounded-md border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-brutal-charcoal" strokeWidth={3} />
              </div>
              <p className="text-sm text-white/90 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <p className="text-brutal-sage/60 line-through text-lg mb-2">De R$ 197,00</p>
          <p className="text-5xl sm:text-7xl font-extrabold text-brutal-yellow tracking-tighter font-heading">R$ 49,00</p>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-3 bg-brutal-yellow text-brutal-charcoal px-10 sm:px-14 py-5 rounded-lg text-base sm:text-lg font-extrabold btn-brutal"
        >
          QUERO ACESSAR MEU DIAGNÓSTICO AGORA
          <ArrowRight className="w-6 h-6" />
        </a>
      </div>
    </div>
  </section>
);
