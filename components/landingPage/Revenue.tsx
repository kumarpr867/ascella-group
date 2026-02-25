import React from "react";

const AnimatedSvg: React.FC = () => {
  return (
    <svg
      width="472"
      height="422"
      viewBox="0 0 472 422"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle with rotation */}
      <circle
        cx="260.043"
        cy="211"
        r="210"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="1 1"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 260.043 211"
          to="360 260.043 211"
          dur="60s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Inner circles with dashoffset animation */}
      <circle
        cx="260.043"
        cy="211"
        r="182.236"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;10;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="260.043"
        cy="211"
        r="203.907"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;15;0"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Static circles */}
      <circle cx="260.043" cy="211" r="31.6851" fill="black" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="163.097" cy="62.7297" r="3.42162" fill="white" />
      <circle cx="164.238" cy="211" r="3.42162" fill="white" />
      <circle cx="426.562" cy="138.006" r="3.42162" fill="white" />
      <circle cx="346.724" cy="203.016" r="7.98378" fill="white" />

      {/* Example line animation */}
      <path
        d="M292.549 211H468.192"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;10;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default AnimatedSvg;