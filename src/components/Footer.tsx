import { Zap } from "lucide-react";

const footerLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sintomas", href: "#sintomas" },
  { label: "Método", href: "#metodo" },
  { label: "Autoridade", href: "#autoridade" },
  { label: "Oferta", href: "#oferta" },
];

export const Footer = () => (
  <footer className="py-16 bg-brutal-charcoal border-t-2 border-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-brutal-yellow rounded-sm flex items-center justify-center border-2 border-black">
              <Zap className="w-5 h-5 text-brutal-charcoal" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tighter font-heading">SINERGIA</span>
          </div>
          <p className="text-sm text-brutal-sage/60 leading-relaxed">
            Protocolo de engenharia comportamental para líderes de alto nível.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brutal-sage font-bold mb-4">Navegação</p>
          <div className="space-y-2">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="block text-sm text-brutal-sage/60 hover:text-brutal-yellow transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brutal-sage font-bold mb-4">Legal</p>
          <p className="text-xs text-brutal-sage/40 leading-relaxed">
            Este produto não substitui aconselhamento médico. Os resultados dependem da aplicação técnica do protocolo.
          </p>
        </div>

        {/* Social */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brutal-sage font-bold mb-4">Social</p>
          <div className="flex gap-3">
            {["IG", "YT", "LI"].map((s) => (
              <div
                key={s}
                className="w-10 h-10 bg-[#272727] border border-brutal-sage/20 rounded-sm flex items-center justify-center text-xs font-bold text-brutal-sage/60 hover:bg-brutal-yellow hover:text-brutal-charcoal hover:border-black transition-all cursor-pointer"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-brutal-sage/10 pt-8 text-center">
        <p className="text-xs text-brutal-sage/40">
          Copy por Lucas Marsili · Lançado por BM Coproduções · Todos os Direitos Reservados
        </p>
      </div>
    </div>
  </footer>
);
