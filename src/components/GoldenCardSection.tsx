import { motion } from "framer-motion";

const coins = [
  { left: "8%", top: "20%", delay: 0, duration: 5 },
  { left: "15%", top: "70%", delay: 1.2, duration: 6 },
  { left: "85%", top: "25%", delay: 0.6, duration: 5.5 },
  { left: "90%", top: "65%", delay: 1.8, duration: 6.5 },
  { left: "25%", top: "85%", delay: 2.2, duration: 5 },
  { left: "75%", top: "85%", delay: 0.3, duration: 6 },
];

const GoldenCardSection = () => {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #001A5E 0%, #000D30 50%, #000005 100%)",
      }}
    >
      <style>{`
        @keyframes card-float-rotate {
          0%, 100% { transform: perspective(1200px) rotateY(-5deg) translateY(0); }
          50% { transform: perspective(1200px) rotateY(5deg) translateY(-10px); }
        }
        @keyframes coin-float {
          0% { transform: translateY(20px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
        @keyframes card-shine {
          0% { transform: translateX(-100%) skewX(-25deg); }
          60% { transform: translateX(250%) skewX(-25deg); }
          100% { transform: translateX(250%) skewX(-25deg); }
        }
        .golden-card-3d {
          animation: card-float-rotate 6s ease-in-out infinite;
        }
        .golden-card-3d:hover {
          animation-play-state: paused;
        }
        .golden-card-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
          animation: card-shine 4s infinite;
          pointer-events: none;
        }
        .coin {
          position: absolute;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #FFE99A, #D4A843 55%, #7A5520);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5A3E10;
          font-weight: 800;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(212,168,67,0.5), inset 0 -3px 6px rgba(0,0,0,0.3);
          animation: coin-float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Floating coins */}
        <div className="absolute inset-0 pointer-events-none">
          {coins.map((c, i) => (
            <div
              key={i}
              className="coin"
              style={{
                left: c.left,
                top: c.top,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.duration}s`,
              }}
            >
              $
            </div>
          ))}
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-12 relative z-10"
        >
          <div
            className="golden-card-3d relative rounded-2xl overflow-hidden"
            style={{
              width: "min(420px, 90vw)",
              aspectRatio: "420 / 260",
              background:
                "linear-gradient(135deg, #B8860B 0%, #FFD700 35%, #C9A84C 65%, #8B6914 100%)",
              boxShadow:
                "0 30px 60px rgba(0,0,0,0.55), 0 0 50px rgba(245,216,122,0.35), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -4px 10px rgba(0,0,0,0.25)",
            }}
          >
            <div className="golden-card-shine" />
            <div className="relative h-full p-6 flex flex-col justify-between" style={{ color: "#3A2A08" }}>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold tracking-wide">
                  THE W
                </div>
                <div className="text-xs md:text-sm font-semibold tracking-[0.25em] mt-1 opacity-90">
                  SÓCIO INVESTIDOR
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="text-[10px] md:text-xs font-bold tracking-wider max-w-[60%] leading-tight">
                  RENDIMENTO
                  <br />
                  ATÉ 8% A.M.
                </div>
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-display text-lg md:text-xl"
                  style={{
                    background: "rgba(58,42,8,0.85)",
                    color: "#F5D87A",
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)",
                  }}
                >
                  W
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Torne-se um <span className="gold-text">Sócio Investidor</span>
          </h2>
          <p className="text-base md:text-lg text-[#A8B8C8] mb-8">
            Contrato formal · CNPJ ativo · Rentabilidade real
          </p>
          <a href="#" className="cta-button text-base md:text-lg">
            Quero Meu Lugar
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GoldenCardSection;
