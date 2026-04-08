const brands = ["SINERGIA", "NEUROCIÊNCIA", "PNL", "HIPNOSE", "USP", "HYA", "LONDRES"];

export const SocialProofBar = () => (
  <div className="w-full bg-brutal-charcoal border-b-2 border-black overflow-hidden py-5">
    <div className="ticker-scroll whitespace-nowrap flex gap-20">
      {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
        <span key={i} className="text-brutal-sage/50 text-2xl font-extrabold tracking-tighter font-heading">
          {brand}
        </span>
      ))}
    </div>
  </div>
);
