import { useState } from 'react';

const HERO_IMG = "https://i.imgur.com/qBlHQE3.jpeg";

const Hero = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="bg-dark-radial py-12 md:py-20 md:px-20 px-[8px] pt-[20px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <p className="gold-text text-xs sm:text-sm uppercase tracking-widest mb-4 font-semibold">
            Aviso para líderes e empresários de alto nível
          </p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#F0F4F8]">
            VOCÊ ESTÁ ACORRENTADO AO QUE FICOU TRANCADO ATRÁS DA SUA{' '}
            <span className="gold-text">PORTA NEURAL.</span>
          </h1>

          {/* Mobile image */}
          <div className="flex-shrink-0 relative mb-6 md:hidden w-full -mx-[8px] overflow-hidden">
            <div className="relative w-full aspect-[4/5]">
              {!imgLoaded && (
                <div className="skeleton-gold w-full h-full" />
              )}
              <img
                src={HERO_IMG}
                alt="Lucas Marsili"
                loading="lazy"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
                onLoad={() => setImgLoaded(true)}
              />
              {/* Smoked effect top and bottom */}
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0B0D11] to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0B0D11] to-transparent pointer-events-none" />
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

          <p className="text-[#A8B8C8] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
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

        <div className="flex-shrink-0 relative hidden md:block order-2 overflow-hidden rounded-lg">
          <div className="relative">
            <img
              src={HERO_IMG}
              alt="Lucas Marsili"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-[320px] lg:w-[400px] object-cover"
            />
            {/* Smoked effect for desktop (All sides) */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_30px_#0B0D11] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#0B0D11] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0B0D11] to-transparent pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0B0D11] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0B0D11] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
