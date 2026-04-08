import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';

const cards = [
  {
    icon: '⚙️',
    title: 'A Decisão Corrompida',
    text: 'Você hesita em decisões simples. Sabe exatamente o que deve fazer, mas uma força invisível te trava ou te empurra para o caminho mais "seguro" e menos lucrativo.',
  },
  {
    icon: '📈',
    title: 'O Teto de Vidro Emocional',
    text: 'Toda vez que a empresa atinge um pico de sucesso, você, subconscientemente, cria um problema. Um atrito com um sócio, um gasto desnecessário. O sucesso tornou-se um gatilho de estresse.',
  },
  {
    icon: '🛡️',
    title: 'A Solidão Blindada',
    text: 'Você chega em casa, mas não consegue "desligar" o modo de guerra. Você tornou-se insensível e impaciente. A armadura que te protege no mercado está sufocando a sua família.',
  },
];

const DorSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 1);
  const titleClass = getTitleClass(theme, 1);
  const isWhite = theme === 'light';

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 ${titleClass}`}>
          O SEU PASSADO NÃO RESOLVIDO É A SUA PRISÃO NO PRESENTE.
        </h2>
        <p className={`text-center mb-12 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto ${isWhite ? 'text-[#0A1628]/80' : 'text-[#A8B8C8]'}`}>
          Se a sua Porta Neural está fechada, você não está no comando; você está apenas a reagir ao peso do que ficou trancado. O seu corpo envia os sinais:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`rounded-lg p-6 ${isWhite ? 'bg-[#F5F7FA] border border-[#D4A843]/30' : 'bg-card-dark gold-border'}`}
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="gold-text font-display text-xl font-bold mb-3">{card.title}</h3>
              <p className={`text-sm sm:text-base leading-relaxed ${isWhite ? 'text-[#0A1628]' : 'text-[#A8B8C8]'}`}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DorSection;
