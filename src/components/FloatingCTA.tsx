import { useEffect, useState } from "react";
import { X } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/558399617709?text=" +
  encodeURIComponent("Clique aqui para falar com Washington e se tornar um sócio investidor.");

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <path
      fill="#FFFFFF"
      d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26 0 1.33.97 2.62 1.11 2.8.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32z"
    />
    <path
      fill="#FFFFFF"
      d="M26.65 5.33A14.86 14.86 0 0 0 16.02.92C7.83.92 1.18 7.57 1.17 15.75c0 2.61.68 5.17 1.98 7.42L1.05 31.08l8.09-2.12a14.9 14.9 0 0 0 7.12 1.81h.01c8.18 0 14.84-6.65 14.85-14.83a14.75 14.75 0 0 0-4.47-10.6zM16.27 28.26h-.01a12.34 12.34 0 0 1-6.29-1.72l-.45-.27-4.8 1.26 1.28-4.68-.29-.47a12.33 12.33 0 0 1-1.89-6.58c0-6.81 5.55-12.35 12.36-12.35 3.3 0 6.4 1.29 8.73 3.62a12.27 12.27 0 0 1 3.62 8.74c0 6.81-5.55 12.35-12.36 12.35z"
    />
  </svg>
);

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
    <>
      <style>{`
        @keyframes wpp-pulse-ring {
          0% { transform: scale(0.9); opacity: 0.7; }
          80% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes wpp-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.7), 0 6px 22px rgba(37,211,102,0.55), 0 0 24px 4px rgba(37,211,102,0.55); }
          50% { box-shadow: 0 0 0 6px rgba(37,211,102,0.0), 0 6px 28px rgba(37,211,102,0.7), 0 0 38px 8px rgba(37,211,102,0.85); }
        }
        .wpp-btn { animation: wpp-glow 2s ease-in-out infinite; }
        .wpp-ring {
          position: absolute; inset: 0; border-radius: 9999px;
          border: 2px solid #25D366;
          animation: wpp-pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite;
        }
      `}</style>

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
                Clique aqui para falar com Washington e se tornar um sócio investidor.
              </a>
            </div>
          </div>
        )}

        <div className="relative">
          {!open && <span className="wpp-ring" />}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir WhatsApp"
            className="wpp-btn relative rounded-full w-14 h-14 flex items-center justify-center transition-transform hover:scale-105"
            style={{ background: "#25D366" }}
          >
            {open ? <X className="w-6 h-6 text-white" /> : <WhatsAppIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingCTA;
