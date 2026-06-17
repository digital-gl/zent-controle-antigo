import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const LOGO = "https://i.imgur.com/mA7WzCc.png";

const links = [
  { href: "#how-it-works", label: "Como Funciona" },
  { href: "#resultados", label: "Rentabilidade" },
  { href: "#indicacoes", label: "Indicações" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#000005]/70 border-b border-[#D4A843]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={LOGO}
            alt="The W Consultoria e Tecnologia"
            loading="eager"
            decoding="async"
            className="h-10 w-10 rounded-full border border-[#D4A843]/60 shadow-[0_0_12px_rgba(212,168,67,0.4)]"
          />
          <span className="font-display text-lg sm:text-xl gold-text leading-none">
            The W
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
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

        <div className="flex items-center gap-2">
          <a
            href="#oferta"
            className="cta-button !py-2 !px-4 text-[11px] sm:text-xs hidden sm:inline-block"
          >
            Quero Ser Sócio
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 text-[#F5D87A]"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#D4A843]/20 bg-[#000005]/95 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[#F0F4F8]/90 hover:text-[#F5D87A] text-base py-1.5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#oferta"
              onClick={() => setOpen(false)}
              className="cta-button text-center mt-2 sm:hidden"
            >
              Quero Ser Sócio
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
