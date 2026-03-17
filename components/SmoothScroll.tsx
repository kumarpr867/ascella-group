"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useAnimationFrame } from "motion/react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
  });

  useAnimationFrame((time) => {
    lenis.raf(time);
  });

  useEffect(() => {
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}