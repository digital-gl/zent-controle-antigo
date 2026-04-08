import { useState } from 'react';
import lucasImg from '@/assets/lucas-terno.jpg';

const Hero = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="bg-dark-radial py-12 md:py-20 md:px-20 px-[8px] pt-[20px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left column: headline + image + CTA + subheadline */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          {/* HEADLINE */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="gold-text">Você ainda funciona por fora.</span>
            <br />
            <span className="gold-text">Mas por dentro, algo quebrou.</span>
          </h1>

          {/* IMAGE - visible only on mobile, between headline and CTA */}
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
              <div
                className="price-badge absolute -bottom-4 -right-4 rounded-lg px-4 py-3 text-center gold-border"
                style={{ background: 'linear-gradient(135deg, #040D2E 0%, #0A1E4A 100%)' }}
              >
                <p className="text-xs" style={{ color: '#D4A843' }}>Por apenas</p>
                <p className="text-2xl font-bold gold-text">R$ 49</p>
                <p className="text-xs" style={{ color: '#2888E0' }}>Acesso Imediato</p>
              </div>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="flex flex-col items-center md:items-start gap-3 mb-6">
            <a href="#oferta" className="cta-button text-sm sm:text-base">
              QUERO DESCOBRIR O QUE ME TRAVA
            </a>
            <p className="text-[#607080] text-sm">
              Diagnóstico guiado. Acesso imediato. Resultado em minutos.
            </p>
          </div>

          {/* SUBHEADLINE */}
          <p className="text-[#A8B8C8] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
            Descubra o que está travando sua mente, suas decisões e sua vida, mesmo que você acredite que já superou tudo.
          </p>
        </div>

        {/* Desktop image - hidden on mobile */}
        <div className="flex-shrink-0 relative hidden md:block order-2">
          <div className="relative">
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
            <div
              className="price-badge absolute bottom-2 right-[-20px] rounded-lg px-4 py-3 text-center gold-border"
              style={{ background: 'linear-gradient(135deg, #040D2E 0%, #0A1E4A 100%)' }}
            >
              <p className="text-xs" style={{ color: '#D4A843' }}>Por apenas</p>
              <p className="text-2xl font-bold gold-text">R$ 49</p>
              <p className="text-xs" style={{ color: '#2888E0' }}>Acesso Imediato</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
