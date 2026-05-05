import { useState } from 'react';

const HERO_IMG = "https://i.imgur.com/qBlHQE3.jpeg";

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
                className="w-full h-full object-cover rounded-2xl"
                onLoad={() => setImgLoaded(true)}
              />
              {/* Smoked effect for mobile integrated with background */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_10px_#0B0D11] rounded-2xl pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0B0D11]/90 via-[#0B0D11]/40 to-transparent rounded-t-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0B0D11]/90 via-[#0B0D11]/40 to-transparent rounded-b-2xl pointer-events-none" />
              <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#0B0D11]/90 via-[#0B0D11]/40 to-transparent rounded-l-2xl pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#0B0D11]/90 via-[#0B0D11]/40 to-transparent rounded-r-2xl pointer-events-none" />
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
              className="w-[320px] lg:w-[450px] h-full object-cover rounded-3xl"
            />
            {/* Smoked effect for desktop integrated with background */}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_30px_#0B0D11] rounded-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0B0D11]/80 via-[#0B0D11]/30 to-transparent rounded-t-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0D11]/80 via-[#0B0D11]/30 to-transparent rounded-b-3xl pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0B0D11]/80 via-[#0B0D11]/30 to-transparent rounded-l-3xl pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0B0D11]/80 via-[#0B0D11]/30 to-transparent rounded-r-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
