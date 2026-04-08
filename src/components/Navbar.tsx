import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

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
    <nav className="sticky top-0 z-40 bg-brutal-yellow border-b-2 border-black h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brutal-charcoal rounded-sm flex items-center justify-center">
              <Zap className="w-5 h-5 text-brutal-yellow" />
            </div>
            <span className="text-xl font-extrabold text-brutal-charcoal tracking-tighter font-heading">SINERGIA</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-brutal-charcoal hover:underline underline-offset-4 decoration-2"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#oferta"
            className="hidden md:block bg-brutal-charcoal text-white px-5 py-2.5 rounded-lg border-brutal shadow-brutal text-sm font-bold btn-brutal"
          >
            Acessar Diagnóstico
          </a>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brutal-charcoal" aria-label="Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-20 left-0 right-0 md:hidden bg-brutal-yellow border-b-2 border-black px-4 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold text-brutal-charcoal py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#oferta"
            onClick={() => setIsOpen(false)}
            className="block bg-brutal-charcoal text-white px-5 py-3 rounded-lg border-brutal text-sm font-bold text-center"
          >
            Acessar Diagnóstico
          </a>
        </div>
      )}
    </nav>
  );
};
