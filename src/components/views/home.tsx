import React from "react";

export const Home: React.FC = () => {
  return (
    <div style={{ width: "80vw", height: "92vh", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
      <svg width="80vw" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="textGradient" gradientTransform="rotate(4)">
            <stop offset="0%" stopColor="var(--bg-3)" />
            <stop offset="50%" stopColor="var(--fg-1)" />
            <stop offset="100%" stopColor="var(--bg-3)" />
          </linearGradient>
        </defs>
        
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fontSize="var(--md)" 
          fontWeight="bold" 
          fill="url(#textGradient)"
        >
          SERIAL-X
        </text>

        <text 
          x="50%" 
          y="60%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fontSize="var(--md)" 
          fontWeight="bold" 
          fill="url(#textGradient)" 
          transform="scale(1, -1) translate(0, -200)" 
          opacity="0.8"
        >
          SERIAL-X
        </text>
      </svg>
    </div>
  );
};
