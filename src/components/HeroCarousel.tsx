import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Vault, TrendingUp, Trophy, MessageCircle } from "lucide-react";
import tradingBg from "@/assets/trading-bg.jpg";
import washingtonImg from "@/assets/washington-profile.jpg";
import eagleLogo from "@/assets/eagle-logo.png";

const slides = [
  {
    id: 1,
    title: "Mentoria de Trading ao Vivo",
    subtitle: "Aprenda Day Trade com quem opera e ensina ao vivo",
    detail: "Smart Money Concepts",
    cta: "Conheça Turmas",
    ctaHref: "#servicos",
    icon: BookOpen,
    showProfile: true,
  },
  {
    id: 2,
    title: "Rendimento Mensal de 5% Garantido",
    subtitle: "Investimento Mínimo de R$ 300,00",
    detail: "Sua entrada para o mercado financeiro",
    cta: "Abra Sua Conta",
    ctaHref: "#contato",
    icon: Vault,
  },
  {
    id: 3,
    title: "Cadeia de Crescimento de Patrimônio",
    subtitle: "Cofre → Tesouro → FIIs → Fundos → Aporte Mensal",
    detail: "Estratégia completa de construção de riqueza",
    cta: "Entenda o Plano",
    ctaHref: "#servicos",
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "R$ 1.600 com apenas R$ 32 MIL?",
    subtitle: "Poupança: 320k | Nubank: 150k | Nossos Sócios: 32k",
    detail: "Compare e descubra o poder do Forex",
    cta: "Invista Agora",
    ctaHref: "#contato",
    icon: Trophy,
  },
  {
    id: 5,
    title: "O futuro lhe pedirá contas.",
    subtitle: "Comece hoje. Vagas limitadas.",
    detail: "Não espere mais para transformar sua vida financeira",
    cta: "Falar no WhatsApp",
    ctaHref: "https://wa.me/5511999999999",
    icon: MessageCircle,
    showEagle: true,
  },
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const Icon = slide.icon;
  const isExternal = slide.ctaHref.startsWith("http");

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[600px] overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0">
        <img src={tradingBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            key={slide.id}
            className="flex flex-col items-center text-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {slide.showProfile && (
              <img
                src={washingtonImg}
                alt="Washington Venâncio"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-gold object-cover gold-glow"
                width={512}
                height={512}
              />
            )}
            {slide.showEagle && (
              <img src={eagleLogo} alt="Forex Eagle" className="w-20 h-20 sm:w-28 sm:h-28" width={512} height={512} />
            )}
            {!slide.showProfile && !slide.showEagle && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full gradient-gold flex items-center justify-center gold-glow">
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
              </div>
            )}

            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold gradient-gold-text leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl text-foreground/90">{slide.subtitle}</p>
              <p className="text-sm sm:text-base text-gold-light">{slide.detail}</p>
            </div>

            <a
              href={slide.ctaHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="gradient-gold text-primary-foreground px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all hover:scale-105 gold-glow"
            >
              {slide.cta}
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/60 backdrop-blur border border-border/50 flex items-center justify-center text-foreground hover:bg-card transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/60 backdrop-blur border border-border/50 flex items-center justify-center text-foreground hover:bg-card transition-colors"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-gold" : "w-2 bg-foreground/30"
            }`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
