import { useState } from 'react';
import lucasImg from '@/assets/lucas-terno.jpg';
import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const credentials = [
  { label: 'Rigor Acadêmico', text: 'Mestre pela USP com vivência e especialização em Londres.' },
  { label: 'Certificação Global', text: 'Hipnoterapeuta Clínico associado à HYA (The International Hypnosis Association – EUA).' },
  { label: 'Expertise Técnica', text: 'Practitioner em PNL, focado no desmonte de bloqueios subconscientes profundos.' },
  { label: 'Visão de Campo', text: 'Como empresário e advogado, Lucas compreende a pressão real e biológica de quem gere patrimônios e vidas.' },
];

const AutoridadeSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 4);
  const titleClass = getTitleClass(theme, 4);
  const isWhite = theme === 'light';
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 ${titleClass}`}>
          O AUDITOR DA SUA MENTE.
        </h2>
        <p className={`text-center mb-12 text-base sm:text-lg ${isWhite ? 'text-[#0A1628]/70' : 'text-[#A8B8C8]'}`}>
          Lucas Marsili. Especialista em Engenharia Comportamental.
        </p>

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
          <div className="flex-1 space-y-4">
            {credentials.map((item, i) => (
              <div
                key={i}
                className={`rounded-lg p-5 ${isWhite ? 'bg-[#F5F7FA] border border-[#D4A843]/30' : 'bg-card-dark gold-border'}`}
              >
                <p className="gold-text font-semibold text-sm uppercase tracking-wide mb-1">{item.label}</p>
                <p className={`text-base leading-relaxed ${isWhite ? 'text-[#0A1628]' : 'text-[#A8B8C8]'}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoridadeSection;
