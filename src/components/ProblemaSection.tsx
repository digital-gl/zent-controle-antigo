import { useState } from 'react';
import { useTheme, getSectionBg } from '@/contexts/ThemeContext';

const steps = [
  {
    title: 'O que você aprendeu',
    content: 'O mercado inteiro te ensinou a crescer. A vender. A escalar. A ter mais disciplina, mais fé, mais estratégia.',
    icon: '📊',
  },
  {
    title: 'O que ninguém te ensinou',
    content: 'Mas ninguém te ensinou o que fazer quando a pessoa que deveria executar tudo isso já não funciona mais por dentro.',
    icon: '🔒',
  },
  {
    title: 'A Porta Neural',
    content: 'Existe uma estrutura dentro da mente chamada Porta Neural. Ela é o ponto de acesso entre quem você é consciente e tudo que foi acumulado ao longo da vida: traumas, crenças, decisões que viraram padrão.',
    icon: '🧠',
  },
  {
    title: 'O que acontece quando ela fecha',
    content: 'Quando essa porta está fechada, nenhuma estratégia funciona. Nenhuma oração desbloqueou o que está travado lá dentro. E você continua repetindo os mesmos ciclos, mesmo com toda a sua inteligência, fé e esforço.',
    icon: '🔄',
  },
  {
    title: 'A verdade',
    content: 'Não é falta de vontade. É uma porta que nunca foi aberta.',
    icon: '🔑',
  },
];

const ProblemaSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 2);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 gold-text">
          O problema não está onde você está procurando
        </h2>
        <p className="text-center text-[#A8B8C8] mb-10 text-base sm:text-lg">
          Clique em cada etapa para entender o mecanismo que trava sua mente
        </p>

        <div className="space-y-4 mb-10">
          {steps.map((step, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                className="rounded-lg overflow-hidden gold-border cursor-pointer transition-all duration-300"
                style={{
                  background: isOpen
                    ? 'linear-gradient(145deg, #0A3060 0%, #062040 100%)'
                    : 'linear-gradient(145deg, #041628 0%, #0A3060 100%)',
                  boxShadow: isOpen ? '0 0 20px rgba(212, 168, 67, 0.2)' : 'none',
                }}
                onClick={() => setActiveIndex(isOpen ? null : i)}
              >
                <div className="flex items-center gap-4 px-6 py-4">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(135deg, #D4A843 0%, #F5D87A 100%)'
                        : 'rgba(212, 168, 67, 0.15)',
                      color: isOpen ? '#020B18' : '#D4A843',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[#F0F4F8] font-medium text-base sm:text-lg flex-1">
                    {step.title}
                  </span>
                  <span
                    className="gold-text text-xl transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
                  >
                    +
                  </span>
                </div>
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '300px' : '0',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-6 pb-5 text-[#A8B8C8] text-base sm:text-lg leading-relaxed pl-20">
                    {step.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="rounded-lg p-6 sm:p-8 gold-border"
          style={{ background: 'linear-gradient(145deg, #041628 0%, #0A3060 100%)' }}
        >
          <p className="text-center text-base sm:text-lg font-medium text-[#F0F4F8] leading-relaxed">
            Seu problema não é falta de esforço. É que você está preso em padrões internos com crenças limitantes e autossabotadoras que operam abaixo do nível da sua consciência.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemaSection;
