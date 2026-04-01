"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    // Check if device is desktop (high-precision pointer & hover support) and not small viewport
    const checkIfDesktop = () => {
      const prefersFinePointer = window.matchMedia?.("(pointer: fine) and (hover: hover)").matches;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      const isSmallScreen = window.innerWidth < 768; // only hide on phone
      return prefersFinePointer && !isMobileUserAgent && !isSmallScreen;
    };

    const desktop = checkIfDesktop();
    setIsDesktop(desktop);
    setMounted(desktop);

    if (!desktop) {
      // Cleanup stale cursor styles if prior desktop mode attached them
      const existing = document.getElementById("custom-cursor-hide-native");
      if (existing) existing.remove();
      document.documentElement.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");
      return;
    }

    // Hide the native cursor globally while this custom cursor is active.
    const originalHtmlCursor = document.documentElement.style.cursor;
    const originalBodyCursor = document.body.style.cursor;
    document.documentElement.style.setProperty("cursor", "none", "important");
    document.body.style.setProperty("cursor", "none", "important");

    const styleEl = document.createElement("style");
    styleEl.id = "custom-cursor-hide-native";
    styleEl.textContent = "html, body, *, *::before, *::after, a, button, input, textarea, select { cursor: none !important; }";
    document.head.appendChild(styleEl);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.style.cursor = originalHtmlCursor;
      document.body.style.cursor = originalBodyCursor;
      const existing = document.getElementById("custom-cursor-hide-native");
      if (existing) existing.remove();
      setMounted(false);
    };
  }, [isDesktop]);

  // Keep desktop/mobile status updated on resize as well
  useEffect(() => {
    const resizeListener = () => {
      const desktop = window.matchMedia?.("(pointer: fine) and (hover: hover)").matches
        && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        && window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };

    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  if (!mounted || !isDesktop) return null;

  return createPortal(
    <>
      {/* blur glow */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white/70 blur-xl pointer-events-none"
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
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none mix-blend-difference"
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