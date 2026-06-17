import { Instagram } from "lucide-react";

const LOGO = "https://i.imgur.com/mA7WzCc.png";

const links = [
  { href: "#how-it-works", label: "Como Funciona" },
  { href: "#resultados", label: "Rentabilidade" },
  { href: "#indicacoes", label: "Indicações" },
  { href: "#contato", label: "Contato" },
];

const Footer = () => {
  return (
    <footer
      id="contato"
      className="py-12 px-4 md:px-8"
      style={{ background: "#000005", borderTop: "1px solid rgba(212,168,67,0.2)" }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <img
          src={LOGO}
          alt="The W Consultoria e Tecnologia"
          loading="lazy"
          decoding="async"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border border-[#D4A843]/50 mx-auto mb-3 shadow-[0_0_18px_rgba(212,168,67,0.35)]"
        />
        <div className="font-display text-xl gold-text mb-1">The W</div>
        <div className="text-[#A8B8C8] text-xs mb-6">Consultoria e Tecnologia</div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[#F0F4F8]/80 hover:text-[#F5D87A] text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://instagram.com/o_washington_forex"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#F5D87A] hover:text-white transition-colors text-sm mb-8"
        >
          <Instagram className="w-4 h-4" />
          @o_washington_forex
        </a>

        <p className="text-[#607080] text-xs max-w-2xl mx-auto mb-4 leading-relaxed">
          Investimentos envolvem riscos. Rentabilidade passada não é garantia de
          resultados futuros. Consulte sempre um especialista.
        </p>
        <p className="text-[#A8B8C8] text-xs">
          © 2026 The W Consultoria e Tecnologia · CNPJ 66.800.082/0001-67
        </p>
      </div>
    </footer>
  );
};

export default Footer;
