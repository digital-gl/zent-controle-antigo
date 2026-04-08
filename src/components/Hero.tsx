import { useState } from 'react';
import lucasImg from '@/assets/lucas-terno.jpg';

const Hero = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="bg-dark-radial py-12 md:py-20 md:px-20 px-[8px] pt-[20px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          {/* Kicker */}
          <p className="gold-text text-xs sm:text-sm uppercase tracking-widest mb-4 font-semibold">
            Aviso para líderes e empresários de alto nível
          </p>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#F0F4F8]">
            VOCÊ ESTÁ ACORRENTADO AO QUE FICOU TRANCADO ATRÁS DA SUA{' '}
            <span className="gold-text">PORTA NEURAL.</span>
          </h1>

          {/* Mobile image */}
          <div className="flex-shrink-0 relative mb-6 md:hidden">
            <div className="relative">
              {!imgLoaded && (
                <div className="skeleton-gold w-[240px] h-[320px] rounded-lg" />
              )}
              <img
                src={lucasImg}
                alt="Lucas Marsili"
                className={`w-[240px] rounded-lg object-cover ${imgLoaded ? 'block' : 'hidden'}`}
                style={{
                  border: '3px solid transparent',
                  borderImage: 'linear-gradient(135deg, #7A5520, #F5D87A, #D4A843, #F5D87A, #7A5520) 1',
                  boxShadow: '0 0 20px rgba(212, 168, 67, 0.3)',
                }}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          </div>

          {/* Subheadline */}
          <p className="text-[#A8B8C8] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
            O seu cérebro fechou a porta para te salvar do colapso, mas deixou as tensões e os traumas lá dentro. Hoje, esse entulho emocional é um sabotador silencioso que força decisões erradas e drena a sua energia vital.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#oferta" className="cta-button text-sm sm:text-base">
              QUERO ABRIR A PORTA E ME DESACORRENTAR
            </a>
          </div>
        </div>

        {/* Desktop image */}
        <div className="flex-shrink-0 relative hidden md:block order-2">
          <img
            src={lucasImg}
            alt="Lucas Marsili"
            className="w-[280px] rounded-lg object-cover"
            style={{
              border: '3px solid transparent',
              borderImage: 'linear-gradient(135deg, #7A5520, #F5D87A, #D4A843, #F5D87A, #7A5520) 1',
              boxShadow: '0 0 20px rgba(212, 168, 67, 0.3)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
