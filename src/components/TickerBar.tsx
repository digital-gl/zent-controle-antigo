const items = [
  "✦ ERRO DE HARDWARE MENTAL",
  "✦ OCLUSÃO COGNITIVA",
  "✦ FADIGA DE DECISÃO",
  "✦ DESTRAVE A PORTA NEURAL",
  "✦ RECUPERE O GOVERNO",
];

export const TickerBar = () => (
  <div className="w-full bg-cyber overflow-hidden py-2.5 relative z-50">
    <div className="ticker-scroll whitespace-nowrap flex gap-16">
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="text-primary-foreground text-xs font-bold tracking-[0.2em] uppercase">
          {item}
        </span>
      ))}
    </div>
  </div>
);
