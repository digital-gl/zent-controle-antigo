const items = [
  "✦ IDENTIFIQUE A TRAVA ✦",
  "✦ DESMONTE A AUTOSSABOTAGEM ✦",
  "✦ RECUPERE O GOVERNO DO SEU SISTEMA ✦",
];

export const TickerBar2 = () => (
  <div className="w-full bg-cyber overflow-hidden py-3 relative">
    <div className="ticker-scroll whitespace-nowrap flex gap-16">
      {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="text-primary-foreground text-xs font-bold tracking-[0.2em] uppercase">
          {item}
        </span>
      ))}
    </div>
  </div>
);
