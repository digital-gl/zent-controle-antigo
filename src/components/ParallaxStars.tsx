import React, { useMemo } from 'react';

interface ParallaxStarsProps {
  speed?: number;
  className?: string;
}

const generateBoxShadows = (n: number) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }
  return value;
};

const ParallaxStars: React.FC<ParallaxStarsProps> = ({ speed = 1, className = '' }) => {
  const shadowsSmall = useMemo(() => generateBoxShadows(700), []);
  const shadowsMedium = useMemo(() => generateBoxShadows(200), []);
  const shadowsBig = useMemo(() => generateBoxShadows(100), []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <style>{`
        @keyframes animStarParallax {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
      `}</style>

      {/* Radial gradient matching site palette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at bottom, #001A5E 0%, #000005 100%)',
        }}
      />

      {/* Small stars */}
      <div
        className="absolute left-0 top-0 w-[1px] h-[1px] bg-transparent"
        style={{
          boxShadow: shadowsSmall,
          animation: `animStarParallax ${50 / speed}s linear infinite`,
        }}
      >
        <div
          className="absolute top-[2000px] w-[1px] h-[1px] bg-transparent"
          style={{ boxShadow: shadowsSmall }}
        />
      </div>

      {/* Medium stars */}
      <div
        className="absolute left-0 top-0 w-[2px] h-[2px] bg-transparent"
        style={{
          boxShadow: shadowsMedium,
          animation: `animStarParallax ${100 / speed}s linear infinite`,
        }}
      >
        <div
          className="absolute top-[2000px] w-[2px] h-[2px] bg-transparent"
          style={{ boxShadow: shadowsMedium }}
        />
      </div>

      {/* Big stars */}
      <div
        className="absolute left-0 top-0 w-[3px] h-[3px] bg-transparent"
        style={{
          boxShadow: shadowsBig,
          animation: `animStarParallax ${150 / speed}s linear infinite`,
        }}
      >
        <div
          className="absolute top-[2000px] w-[3px] h-[3px] bg-transparent"
          style={{ boxShadow: shadowsBig }}
        />
      </div>
    </div>
  );
};

export default ParallaxStars;
