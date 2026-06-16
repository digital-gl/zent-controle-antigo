const LOGO = "https://i.imgur.com/mA7WzCc.png";

const links = [
  { href: "#resultados", label: "Resultados" },
  { href: "#metodologia", label: "Metodologia" },
  { href: "#autoridade", label: "Washington" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
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

        <a
          href="#oferta"
          className="cta-button !py-2 !px-4 text-[11px] sm:text-xs"
        >
          Quero Ser Sócio
        </a>
      </div>
    </header>
  );
};

export default Navbar;
