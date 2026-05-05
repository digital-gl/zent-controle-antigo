import { useState } from 'react';

const HERO_IMG = "https://i.imgur.com/CuMB4Sp.jpeg";

const Hero = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="bg-dark-radial py-12 md:py-0 md:px-20 px-[8px] pt-[20px] flex items-center min-h-[600px] md:min-h-[800px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <p className="gold-text text-xs sm:text-sm uppercase tracking-widest mb-4 font-semibold">
            Aviso para líderes e empresários de alto nível
          </p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 gold-text">
            Você fez tudo certo. Por que o resultado ainda não chegou?
          </h1>

          <p className="text-[#F0F4F8] text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto md:mx-0 mb-6">
            Não é falta de fé, estratégia, nem culpa do mercado. É a sua Porta Neural trancada, que você mesmo a fechou. E agora ela precisa ser aberta!
          </p>

          {/* Mobile image */}
          <div className="flex-shrink-0 relative mb-6 md:hidden w-full -mx-[8px] overflow-hidden">
            <div className="relative w-[85%] mx-auto aspect-[4/5]">
              {!imgLoaded && (
                <div className="skeleton-gold w-full h-full rounded-2xl" />
              )}
              <img
                src={HERO_IMG}
                alt="Lucas Marsili"
                loading="lazy"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl border-2 border-[#D4A843]/50 shadow-[0_0_15px_rgba(212,168,67,0.3)]"
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          </div>

          {/* Mobile CTA below image */}
          <div className="flex flex-col items-center w-full md:hidden mb-4">
            <a
              href="#oferta"
              className="cta-button w-[90%] max-w-md mx-auto px-4 py-3 text-[11px] sm:text-sm md:text-base leading-tight text-center flex items-center justify-center"
            >
              QUERO ABRIR A PORTA E ME DESACORRENTAR
            </a>
          </div>

          <p className="text-[#A8B8C8] text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8 mt-4">
            O seu cérebro fechou a porta para te salvar do colapso, mas deixou as tensões e os traumas lá dentro. Hoje, esse entulho emocional é um sabotador silencioso que força decisões erradas e drena a sua energia vital.
          </p>

          {/* Desktop CTA */}
          <div className="hidden md:flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
            <a
              href="#oferta"
              className="cta-button w-[90%] max-w-md mx-auto px-4 py-3 text-[11px] sm:text-sm md:text-base md:w-auto md:whitespace-nowrap leading-tight text-center flex items-center justify-center"
            >
              QUERO ABRIR A PORTA E ME DESACORRENTAR
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 relative hidden md:block order-2 overflow-hidden self-stretch">
          <div className="relative h-full">
            <img
              src={HERO_IMG}
              alt="Lucas Marsili"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-[320px] lg:w-[450px] h-full object-cover rounded-3xl border-2 border-[#D4A843]/50 shadow-[0_0_30px_rgba(212,168,67,0.3)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
