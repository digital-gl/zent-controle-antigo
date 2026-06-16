import { useEffect, useState } from "react";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#oferta"
      className={`md:hidden fixed bottom-4 right-4 z-50 rounded-full px-5 py-3 font-bold uppercase text-sm transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #A07830 0%, #F5D87A 50%, #D4A843 100%)",
        color: "#020B18",
        boxShadow: "0 6px 22px rgba(212,168,67,0.55)",
        letterSpacing: "0.04em",
      }}
    >
      Quero Investir
    </a>
  );
};

export default FloatingCTA;
