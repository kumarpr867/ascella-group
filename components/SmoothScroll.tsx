"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useAnimationFrame } from "motion/react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      return () => {
        try {
          if (lenisRef.current) {
            lenisRef.current.destroy();
            lenisRef.current = null;
          }
          // Emergency reset for body overflow
          if (document.body.style.overflow === "hidden") {
            document.body.style.overflow = "auto";
          }
        } catch (error) {
          console.warn("Error destroying Lenis:", error);
        }
      };
    } catch (error) {
      console.warn("Error initializing Lenis:", error);
      return;
    }
  }, []);

  useAnimationFrame((time) => {
    try {
      lenisRef.current?.raf(time);
    } catch (error) {
      console.warn("Error in Lenis RAF:", error);
    }
  });

  return <>{children}</>;
}