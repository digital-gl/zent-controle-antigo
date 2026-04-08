import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sintomas", label: "Sintomas" },
  { href: "#metodo", label: "Método" },
  { href: "#autoridade", label: "Autoridade" },
  { href: "#oferta", label: "Oferta" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#inicio" className="text-xl font-bold text-cyber tracking-tight">
            SINERGIA
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-cyber transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#oferta"
              className="bg-cyber text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-transform"
            >
              Acessar Diagnóstico
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-border/20 px-4 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm text-foreground/70 hover:text-cyber py-2 uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#oferta"
            onClick={() => setIsOpen(false)}
            className="block bg-cyber text-primary-foreground px-6 py-3 rounded-full text-sm font-bold text-center"
          >
            Acessar Diagnóstico
          </a>
        </div>
      )}
    </nav>
  );
};
