import React from "react";

// Center of all orbits
const CX = 260.043;
const CY = 211;

// Each dot rotates around the main center (CX, CY)
// orbit radius = distance from center to dot's starting position
// starting angle = atan2(dy, dx) in degrees

const AnimatedSvg: React.FC = () => {
  return (
    <svg
      className="w-[200px] h-[200px] xl:w-[300px] xl:h-[300px]"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Static geometry ──────────────────────────────────── */}
      <circle cx="260.043" cy="211" r="210" stroke="white" strokeWidth="2" strokeDasharray="1 1" />
      <circle cx="260.043" cy="211" r="182.236" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="260.043" cy="211" r="203.907" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="260.043" cy="211" r="150.301" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="260.043" cy="211" r="95.5554" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="260.043" cy="211" r="79.5878" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />

      <path d="M465.911 166.741C448.787 159.973 430.125 156.254 410.595 156.254C327.447 156.254 260.043 223.658 260.043 306.805C260.043 350.001 278.235 388.949 307.376 416.403"
        stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <path d="M57.3918 269.474C73.9523 273.393 91.9793 271.247 107.875 262.069C140.958 242.969 152.282 200.647 133.169 167.541C118.545 142.211 90.3395 129.615 63.0786 133.65"
        stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />

      <circle cx="318.781" cy="366.684" r="41.3797" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="180.205" cy="85.5406" r="31.6851" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />

      <path d="M292.549 211H468.192" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <path d="M260.043 242.935L260.043 418.578" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <path d="M260.043 3.42139L260.043 179.065" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <path d="M366.047 30.794L157.394 392.192" stroke="white" strokeWidth="0.2" strokeDasharray="4 4" />
      <path d="M114.182 63.9539L409.261 359.035" stroke="white" strokeWidth="0.2" strokeDasharray="1 1" />
      <path d="M52.4648 211H228.108" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />

      {/* Center filled circle (static) */}
      <circle cx="260.043" cy="211" r="31.6851" fill="black" stroke="white" strokeWidth="1" strokeDasharray="1 1" />

      {/* ── Rotating dots ────────────────────────────────────────
          Each <circle> is wrapped in a <g> that uses animateTransform
          to rotate around the SVG center (CX=260.043, CY=211).

          Orbit radii (distance from center to dot):
            dot1    → 177.151  (starts at -123.18°)
            dot2    →  95.805  (starts at  180.00°)
            dot3    → 181.815  (starts at  -23.67°)
            bigDot  →  87.048  (starts at   -5.26°)

          All rotate 0→360 around (260.043, 211).
          Speed: dot1=30s, dot2=40s, dot3=25s, bigDot=50s
          Directions are mixed for a natural orbital feel.
      ── */}

      {/* dot1 — small white, orbit r≈177, slow CCW, 30s */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 260.043 211"
          to="360 260.043 211"
          dur="30s"
          repeatCount="indefinite"
        />
        <circle cx="163.097" cy="62.7297" r="3.42162" fill="white" />
      </g>

      {/* dot2 — small white, orbit r≈96, slow CW, 40s */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 260.043 211"
          to="-360 260.043 211"
          dur="20s"
          repeatCount="indefinite"
        />
        <circle cx="164.238" cy="211" r="5" fill="white" />
      </g>

      {/* dot3 — small white, orbit r≈182, slow CCW, 25s */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 260.043 211"
          to="360 260.043 211"
          dur="25s"
          repeatCount="indefinite"
        />
        <circle cx="426.562" cy="138.006" r="3.42162" fill="white" />
      </g>

      {/* bigDot — large white, orbit r≈87, slow CW, 50s */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 260.043 211"
          to="-360 260.043 211"
          dur="50s"
          repeatCount="indefinite"
        />
        <circle cx="346.724" cy="203.016" r="7.98378" fill="white" />
      </g>
    </svg>
  );
};

export default AnimatedSvg;