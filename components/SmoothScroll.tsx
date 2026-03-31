"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  const shouldUseLenis = () => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
    return true;
  };

  useEffect(() => {
    if (!shouldUseLenis()) {
      return;
    }

    try {
      const lenis = new Lenis({
        duration: 0.6, // faster yet still smooth
        smoothWheel: true,
        wheelMultiplier: 1.3,
        touchMultiplier: 1.1,
      });

      lenisRef.current = lenis;

      const frame = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(frame);
      };

      rafRef.current = requestAnimationFrame(frame);

      return () => {
        if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
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

  return <>{children}</>;
}