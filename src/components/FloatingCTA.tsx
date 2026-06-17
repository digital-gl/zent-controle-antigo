import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/558399617709?text=" +
  encodeURIComponent("Quero falar com Washington para ser um sócio investidor.");

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {open && (
        <div
          className="w-[280px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "#075E54", color: "#FFFFFF" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "#25D366", color: "#075E54" }}
              >
                W
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Washington</div>
                <div className="text-[10px] opacity-80">online agora</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3" style={{ background: "#ECE5DD" }}>
            <div
              className="text-xs text-gray-800 rounded-lg px-3 py-2 mb-3 shadow-sm"
              style={{ background: "#FFFFFF" }}
            >
              Olá! 👋 Toque na mensagem abaixo para iniciar a conversa.
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-left text-xs text-gray-800 rounded-lg px-3 py-2 shadow-sm hover:opacity-90 transition"
              style={{ background: "#DCF8C6" }}
            >
              Quero falar com Washington para ser um sócio investidor.
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir WhatsApp"
        className="rounded-full w-14 h-14 flex items-center justify-center transition-transform hover:scale-105"
        style={{
          background: "#25D366",
          boxShadow: "0 6px 22px rgba(37,211,102,0.55)",
        }}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
        )}
      </button>
    </div>
  );
};

export default FloatingCTA;
