import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section className="py-20 sm:py-28 bg-brutal-yellow relative border-y-2 border-black">
    <div className="absolute inset-0 dot-pattern pointer-events-none" />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brutal-charcoal tracking-tighter font-heading mb-8">
        O FUTURO VAI TE COBRAR.{" "}
        <span style={{ WebkitTextStroke: '2px #171e19', WebkitTextFillColor: 'transparent' }}>COMECE AGORA.</span>
      </h2>
      <a
        href="#oferta"
        className="inline-flex items-center gap-3 bg-brutal-charcoal text-white px-10 sm:px-14 py-5 rounded-lg text-base sm:text-lg font-extrabold btn-brutal"
      >
        QUERO MEU DIAGNÓSTICO
        <ArrowRight className="w-6 h-6" />
      </a>
    </div>
  </section>
);
