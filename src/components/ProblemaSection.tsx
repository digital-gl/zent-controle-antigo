import { useTheme, getSectionBg, getTitleClass } from '@/contexts/ThemeContext';
import LuminousCard from './LuminousCard';

const ProblemaSection = () => {
  const { theme } = useTheme();
  const bg = getSectionBg(theme, 2);
  const titleClass = getTitleClass(theme, 2);
  const isWhite = theme === 'light';

  return (
    <section className={`${bg} py-12 md:py-20 px-5 md:px-20`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 ${titleClass}`}>
          O ERRO NÃO É DE ESTRATÉGIA. É DE SOFTWARE.
        </h2>

        <div className={`space-y-6 text-base sm:text-lg leading-relaxed ${isWhite ? 'text-[#0A1628]/80' : 'text-[#A8B8C8]'}`}>
          <p>
            Para construir o que tem hoje, você aguentou pancadas que poucos suportariam. Para te proteger, o seu sistema nervoso acionou um disjuntor de segurança e fechou a sua <span className="gold-text font-semibold">Porta Neural</span>.
          </p>
          <p>
            O problema é que traumas, traições e pressões não superadas ficaram trancados lá dentro, operando como um vírus no seu subconsciente. Você não precisa de mais motivação ou de outro curso de gestão.
          </p>
          <div
            className={`rounded-lg p-6 sm:p-8 gold-border ${isWhite ? 'bg-[#F5F7FA]' : 'bg-card-dark'}`}
          >
            <p className="text-center text-base sm:text-lg font-medium text-[#F0F4F8] leading-relaxed">
              Você precisa de <span className="gold-text font-bold">Sinergia</span>, um protocolo técnico para realizar uma varredura mental, identificar o curto-circuito e religar a chave do seu governo executivo.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <LuminousCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemaSection;
