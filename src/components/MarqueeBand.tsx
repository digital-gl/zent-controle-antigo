interface MarqueeBandProps {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
}

const MarqueeBand = ({ items, direction = "left", duration = 40 }: MarqueeBandProps) => {
  const content = Array(3).fill(items).flat();

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #000D30 0%, #001A5E 50%, #000D30 100%)",
        borderTop: "1px solid rgba(212, 168, 67, 0.5)",
        borderBottom: "1px solid rgba(212, 168, 67, 0.5)",
        height: "60px",
        boxShadow: "0 0 20px rgba(212, 168, 67, 0.15)",
      }}
    >
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div
        className="flex items-center h-full whitespace-nowrap"
        style={{
          width: "max-content",
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${duration}s linear infinite`,
        }}
      >
        {content.map((item, i) => (
          <div key={i} className="flex items-center px-6 text-sm md:text-base font-semibold tracking-wide gold-text">
            <span>{item}</span>
            <span className="ml-6 text-[#F5D87A]" style={{ transform: "rotate(45deg)", display: "inline-block" }}>
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBand;
