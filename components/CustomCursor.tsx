"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* blur glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white/70 blur-xl pointer-events-none"
        style={{
          translateX: smoothX,
          translateY: smoothY,
          x: "-50%",
          y: "-50%",
          zIndex: 999998,
        }}
      />

      {/* core cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none mix-blend-difference"
        style={{
          translateX: smoothX,
          translateY: smoothY,
          x: "-50%",
          y: "-50%",
          zIndex: 999999,
        }}
      />
    </>,
    document.body
  );
}