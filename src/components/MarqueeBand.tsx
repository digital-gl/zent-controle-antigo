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
        background: "linear-gradient(180deg, #A07830 0%, #F5D87A 50%, #A07830 100%)",
        borderTop: "1px solid rgba(0, 0, 0, 0.4)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
        height: "60px",
        boxShadow: "0 0 20px rgba(245, 216, 122, 0.35)",
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
          <div key={i} className="flex items-center px-6 text-sm md:text-base font-bold tracking-wide" style={{ color: "#0A0A0F" }}>
            <span>{item}</span>
            <span className="ml-6" style={{ transform: "rotate(45deg)", display: "inline-block", color: "#0A0A0F" }}>
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBand;
