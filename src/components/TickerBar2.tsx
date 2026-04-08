const items = [
  "✦ IDENTIFIQUE A TRAVA ✦",
  "✦ DESMONTE A AUTOSSABOTAGEM ✦",
  "✦ RECUPERE O GOVERNO DO SEU SISTEMA ✦",
];

export const TickerBar2 = () => (
  <div className="w-full bg-brutal-yellow border-y-2 border-black overflow-hidden py-2.5">
    <div className="ticker-scroll whitespace-nowrap flex gap-16">
      {[...items, ...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="text-brutal-charcoal text-xs font-bold tracking-[0.25em] uppercase font-heading">
          {item}
        </span>
      ))}
    </div>
  </div>
);
