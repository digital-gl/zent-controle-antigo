import { ArrowRight } from "lucide-react";

export const HeroSection = () => (
  <section
    id="inicio"
    className="relative bg-cyber liquid-section min-h-screen flex items-center overflow-hidden"
  >
    {/* Diagonal light beam */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-1/4 w-[2px] h-full bg-primary-foreground/30 rotate-[20deg] origin-top" />
      <div className="absolute top-0 left-1/3 w-[600px] h-full bg-gradient-to-b from-primary-foreground/10 to-transparent rotate-[20deg] origin-top blur-3xl" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
      <div className="max-w-4xl">
        {/* Kicker */}
        <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-primary-foreground/70 mb-6 border border-primary-foreground/20 px-4 py-1.5 rounded-full">
          Aviso para Líderes e Empresários de Alto Nível
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-primary-foreground tracking-tight leading-[0.95] mb-8">
          VOCÊ ESTÁ ACORRENTADO AO QUE FICOU TRANCADO ATRÁS DA SUA{" "}
          <span className="relative inline-block">
            PORTA NEURAL.
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary-foreground/30 rounded-full" />
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed mb-10 font-normal">
          O seu cérebro fechou a porta para te salvar do colapso, mas deixou as tensões e os traumas lá dentro. 
          Hoje, esse entulho emocional é um sabotador silencioso que força decisões erradas e drena a sua energia vital.
        </p>

        {/* CTA */}
        <a
          href="#oferta"
          className="inline-flex items-center gap-3 bg-primary-foreground text-cyber px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl"
        >
          QUERO ABRIR A PORTA E ME DESACORRENTAR
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  </section>
);
