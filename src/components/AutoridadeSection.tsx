import { useState } from 'react';
import lucasImg from '@/assets/lucas-terno.jpg';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const AutoridadeSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 4);
  const titleClass = getTitleClass(theme, 4);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 gold-text">
          Quem desenvolveu este diagnóstico
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-shrink-0">
            {!imgLoaded && <div className="skeleton-gold w-[220px] h-[300px] rounded-lg" />}
            <img
              src={lucasImg}
              alt="Lucas Marsili"
              className={`w-[220px] sm:w-[260px] rounded-lg object-cover ${imgLoaded ? 'block' : 'hidden'}`}
              style={{
                border: '3px solid transparent',
                borderImage: 'linear-gradient(135deg, #7A5520, #F5D87A, #D4A843, #F5D87A, #7A5520) 1',
                boxShadow: '0 0 20px rgba(212, 168, 67, 0.3)',
              }}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
          <div className="flex-1 space-y-5">
            {/* Card 1 */}
            <div
              className="rounded-lg p-5 gold-border"
              style={{ background: 'linear-gradient(145deg, #041628 0%, #0A3060 100%)' }}
            >
              <p className="text-[#A8B8C8] text-base sm:text-lg leading-relaxed">
                Lucas Marsili é especialista em restauração emocional, mental e espiritual. Trabalha com empresários e profissionais que chegaram ao limite por dentro, mas ainda sustentam o mundo por fora.
              </p>
            </div>
            {/* Card 2 */}
            <div
              className="rounded-lg p-5 gold-border"
              style={{ background: 'linear-gradient(145deg, #041628 0%, #0A3060 100%)' }}
            >
              <p className="text-[#A8B8C8] text-base sm:text-lg leading-relaxed">
                Seu método combina hipnoterapia clínica e PNL para conduzir o cliente ao estado de abertura da Porta Neural, o ponto onde os fragmentos entram em sinergia, a clareza mental retorna e aquilo que estava bloqueado se torna visível e trabalhável.
              </p>
            </div>
            {/* Card 3 */}
            <div
              className="rounded-lg p-5 gold-border"
              style={{ background: 'linear-gradient(145deg, #041628 0%, #0A3060 100%)' }}
            >
              <p className="text-[#A8B8C8] text-base sm:text-lg leading-relaxed">
                Não ensina produtividade. Não vende motivação. Atua na raiz do que está quebrando a pessoa, não nos sintomas de fora.
              </p>
            </div>
            {/* Quote card */}
            <div
              className="rounded-lg p-5 mt-2"
              style={{
                background: 'linear-gradient(145deg, #041628 0%, #0A3060 100%)',
                border: '2px solid transparent',
                borderImage: 'linear-gradient(135deg, #7A5520, #F5D87A, #D4A843, #F5D87A, #7A5520) 1',
              }}
            >
              <p className="text-center font-display text-lg sm:text-xl font-semibold gold-text italic">
                "Você não está fraco. Você está carregando mais do que deveria sozinho."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoridadeSection;
