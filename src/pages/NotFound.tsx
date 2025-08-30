import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-secondary/20">
      <div className="text-center neon-border p-12 rounded-2xl">
        <h1 className="text-6xl font-bold mb-4 neon-text">404</h1>
        <p className="text-2xl text-muted-foreground mb-6 neon-text-accent">Página não encontrada</p>
        <a 
          href="/" 
          className="text-primary hover:text-accent underline neon-text text-xl transition-colors duration-300"
        >
          ⚡ Voltar ao Dashboard NEON
        </a>
      </div>
    </div>
  );
};

export default NotFound;
