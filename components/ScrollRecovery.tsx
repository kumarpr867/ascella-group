"use client";

import { useEffect } from "react";

export default function ScrollRecovery() {
  useEffect(() => {
    // Monitor and fix scroll stuck issues
    const checkAndFixScroll = () => {
      try {
        // If body overflow is stuck on "hidden", reset it
        if (
          document.body.style.overflow === "hidden" &&
          !document.body.classList.contains("menu-open")
        ) {
          document.body.style.overflow = "auto";
        }

        // Ensure scrolling is enabled
        const htmlElement = document.documentElement;
        if (htmlElement.style.overflow === "hidden") {
          htmlElement.style.overflow = "auto";
        }

        // Fix if main content is blocking scroll
        const main = document.querySelector("main");
        if (main && main.style.overflow === "hidden") {
          main.style.overflow = "visible";
        }
      } catch (error) {
        console.warn("Scroll recovery check error:", error);
      }
    };

    // Check every 1 second for stuck scroll
    const interval = setInterval(checkAndFixScroll, 1000);

    // Also run on visibility change (tab switch)
    const handleVisibilityChange = () => {
      checkAndFixScroll();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
