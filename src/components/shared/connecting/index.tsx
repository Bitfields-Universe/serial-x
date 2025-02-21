import { useEffect, useRef } from "react";
import anime from "animejs";

export const Connecting = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      // Animate the circles to create a rotating effect
      anime({
        targets: "circle",
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(100),
        loop: true,
        direction: "alternate",
      });
    }
  }, []);

  // Center of the SVG
  const centerX = 50;
  const centerY = 50;
  const radius = 40; // Distance from the center to the circles
  const numCircles = 12; // Number of circles

  // Generate the circles in a circular pattern
  const circles = Array.from({ length: numCircles }, (_, i) => {
    const angle = (i / numCircles) * 2 * Math.PI; // Calculate the angle for each circle
    const cx = centerX + radius * Math.cos(angle); // X position
    const cy = centerY + radius * Math.sin(angle); // Y position
    return (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r="3" // Radius of the circles
        fill="var(--blue)"
        opacity="0" // Start with 0 opacity for the animation
      />
    );
  });

  return (
    <svg ref={svgRef} width="50vw" height="50vh" viewBox="0 0 100 100">
      {circles}
    </svg>
  );
};