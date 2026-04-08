import eagleLogo from "@/assets/eagle-logo.png";

export const Footer = () => (
  <footer className="bg-card border-t border-border/30 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={eagleLogo} alt="Forex Comunidade" className="h-8 w-8" />
          <span className="font-bold gradient-gold-text">FOREX COMUNIDADE DE TRADERS</span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Washington Venâncio | Forex Comunidade de Traders. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);
