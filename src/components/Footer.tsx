const LOGO = "https://i.imgur.com/mA7WzCc.png";

const Footer = () => {
  return (
    <footer className="bg-[#000005] border-t border-[#D4A843]/20 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO}
            alt="The W"
            loading="lazy"
            className="h-12 w-12 rounded-full border border-[#D4A843]/50"
          />
          <div>
            <div className="font-display text-lg gold-text leading-none">The W</div>
            <div className="text-[#A8B8C8] text-xs mt-1">Consultoria e Tecnologia</div>
          </div>
        </div>

        <div className="text-[#A8B8C8] text-xs text-center md:text-right space-y-1">
          <p>The W Consultoria e Tecnologia LTDA</p>
          <p>CNPJ a definir</p>
          <p className="max-w-md">
            Investimentos envolvem riscos. Rentabilidade passada não representa garantia de rentabilidade futura.
          </p>
          <p>© {new Date().getFullYear()} The W. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
