import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GOLD = "#F5D87A";


const teamAvatars = [
  { initials: "JD", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a1.jpg" },
  { initials: "HJ", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a2.jpg" },
  { initials: "PI", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a3.jpg" },
  { initials: "KD", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a4.jpg" },
  { initials: "LD", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a5.jpg" },
];

const stats = [
  { emoji: "📈", label: "RENTABILIDADE MÉDIA MENSAL", value: "5%" },
  { emoji: "🤝", label: "SÓCIOS INVESTIDORES ATIVOS", value: "200+" },
  { emoji: "🏛️", label: "OPERANDO DESDE", value: "2021" },
  { emoji: "💼", label: "CONTRATO FORMAL", value: "24 MESES" },
];

function AvatarStack() {
  return (
    <div className="flex -space-x-3">
      {teamAvatars.map((m, i) => (
        <Avatar
          key={m.initials}
          className="size-12 border-2 bg-neutral-800"
          style={{ zIndex: teamAvatars.length - i, borderColor: GOLD }}
        >
          <AvatarImage alt={`Sócio ${i + 1}`} src={m.src} />
          <AvatarFallback className="bg-neutral-700 text-white text-xs">
            {m.initials}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

function StatsMarquee() {
  const items = [...stats, ...stats, ...stats, ...stats];
  return (
    <div
      className="relative overflow-hidden border-y bg-black/40 py-2 backdrop-blur-sm"
      style={{ borderColor: "rgba(245,216,122,0.2)" }}
    >
      <style>{`
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-marquee-track {
          display: flex;
          gap: 2.5rem;
          width: max-content;
          animation: hero-marquee 35s linear infinite;
        }
      `}</style>
      <div className="hero-marquee-track">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="gold-text font-mono font-bold text-sm tracking-wide" style={{ filter: "drop-shadow(0 0 8px rgba(245,216,122,0.5))" }}>
              {s.value}
            </span>
            <span className="font-mono font-medium text-sm text-white/70 uppercase tracking-[0.15em]">
              {s.label}
            </span>
            <span className="text-base">{s.emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-start justify-end overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=2000&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#000005]/60 via-[#000005]/35 to-[#000005]/65" />
      </div>

      <div className="relative z-[5] flex w-full flex-1 flex-col">
        <img
          src="https://i.imgur.com/NIO5xgF.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top md:hidden"
        />
        <img
          src="https://i.imgur.com/3qiLi50.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-top md:block"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-1/2 bg-gradient-to-r from-[#000005] via-[#000005]/70 to-transparent md:block lg:hidden" />
        <div className="relative z-10 w-full max-w-5xl px-4 pt-28 text-white sm:px-8 lg:px-16">
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Nós <span className="gold-text" style={{ filter: "drop-shadow(0 0 18px rgba(245,216,122,0.55))" }}>operamos</span>, você{" "}
            <span className="gold-text" style={{ filter: "drop-shadow(0 0 18px rgba(245,216,122,0.55))" }}>lucra</span>
            <br />
            <span className="text-white">esse é o pacto.</span>
          </h1>
        </div>

        <div className="relative z-10 mt-auto w-full px-4 pb-4 sm:px-8 lg:px-16">
          <AvatarStack />
        </div>
      </div>

      <div className="relative z-10 w-full">
        <StatsMarquee />
      </div>

      <div className="relative z-10 w-full px-4 pb-16 pt-10 sm:px-8 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="w-full space-y-5 sm:w-1/2">
            <a href="#oferta" className="cta-button text-sm sm:text-base !inline-flex items-center gap-3 whitespace-nowrap">
              Quero Ser Sócio
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="w-full sm:w-1/2">
            <p className="gold-text text-base italic sm:text-right md:text-2xl" style={{ filter: "drop-shadow(0 0 14px rgba(245,216,122,0.4))" }}>

              Trading institucional, gestão de risco e tecnologia proprietária
              colocando o seu capital para trabalhar ao lado dos nossos traders,
              com contrato formal de 24 meses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
