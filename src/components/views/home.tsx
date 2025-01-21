import React, { useEffect } from "react";
import anime from 'animejs/lib/anime.es.js';

export const Home: React.FC = () => {
  useEffect(() => {
    anime({
      targets: '#textGradient',
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutExpo',
      gradientTransform: [
        { value: 'rotate(45)', duration: 8000 },
        { value: 'rotate(-45)', duration: 8000 }
      ]
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="textGradient" gradientTransform="rotate(-45)">
            <stop offset="0%" stopColor="var(--bg-2)" />
            <stop offset="50%" stopColor="var(--fg-1)" />
            <stop offset="100%" stopColor="var(--bg-2)" />
          </linearGradient>
        </defs>

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="var(--sm)"
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
