"use client"

import React from "react";

const SimpleDarkBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black"></div>

      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-transparent to-neutral-950/50"></div>

      {/* Very subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  );
};

export default SimpleDarkBackground;
