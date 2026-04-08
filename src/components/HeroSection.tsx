import { ArrowRight } from "lucide-react";

export const HeroSection = () => (
  <section id="inicio" className="relative bg-brutal-yellow overflow-hidden">
    {/* Dot pattern overlay */}
    <div className="absolute inset-0 dot-pattern pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <span className="inline-block bg-white text-brutal-charcoal text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full border-brutal shadow-brutal mb-8">
            Aviso para Líderes e Empresários de Alto Nível
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-brutal-charcoal tracking-tighter leading-[0.9] mb-8 font-heading">
            VOCÊ ESTÁ ACORRENTADO AO QUE FICOU TRANCADO ATRÁS DA SUA{" "}
            <span className="relative inline-block" style={{ WebkitTextStroke: '2px #171e19', WebkitTextFillColor: 'transparent' }}>
              PORTA NEURAL.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-brutal-charcoal/80 max-w-xl leading-relaxed mb-10">
            O seu cérebro fechou a porta para te salvar do colapso, mas deixou as tensões e os traumas lá dentro.
            Hoje, esse entulho emocional é um sabotador silencioso que força decisões erradas e drena a sua energia vital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center gap-3 bg-brutal-charcoal text-white px-8 py-4 rounded-lg text-base font-bold btn-brutal"
            >
              QUERO ABRIR A PORTA
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#metodo"
              className="inline-flex items-center justify-center gap-2 bg-white text-brutal-charcoal px-8 py-4 rounded-lg text-base font-bold border-brutal shadow-brutal btn-brutal"
            >
              Entenda o Método
            </a>
          </div>
        </div>

        {/* Right column - Browser mockup */}
        <div className="hidden lg:block">
          <div className="bg-white border-brutal rounded-2xl shadow-brutal-xl overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-brutal-charcoal px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            {/* Dashboard content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-brutal-sage/30 border-brutal rounded-lg p-4 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-brutal-charcoal/60 font-bold">Bloqueios</p>
                  <p className="text-2xl font-extrabold text-brutal-charcoal font-heading mt-1">3</p>
                </div>
                <div className="bg-brutal-yellow/50 border-brutal rounded-lg p-4 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-brutal-charcoal/60 font-bold">Clareza</p>
                  <p className="text-2xl font-extrabold text-brutal-charcoal font-heading mt-1">97%</p>
                </div>
                <div className="bg-brutal-sage/30 border-brutal rounded-lg p-4 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-brutal-charcoal/60 font-bold">Reset</p>
                  <p className="text-2xl font-extrabold text-brutal-charcoal font-heading mt-1">✓</p>
                </div>
              </div>
              <div className="bg-brutal-charcoal rounded-lg p-5 text-center">
                <p className="text-brutal-sage text-xs uppercase tracking-widest font-bold">Protocolo Sinergia</p>
                <p className="text-white text-lg font-extrabold font-heading mt-2">Diagnóstico Neural Completo</p>
              </div>
              <div className="bg-brutal-sage/20 border-brutal rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brutal-yellow rounded-md border-brutal flex items-center justify-center text-xs font-bold">⚡</div>
                  <div>
                    <p className="text-sm font-bold text-brutal-charcoal">Porta Neural</p>
                    <p className="text-xs text-brutal-charcoal/60">Status: Pronta para reset</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
