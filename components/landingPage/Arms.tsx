"use client";

import { motion } from "framer-motion";
import { content } from "./data/content";
import { useScrollSpy } from "./hooks/useScrollSpy";
import PlusHeading from "../headings/PlusHeading";
import { useRef, useLayoutEffect, useState } from "react";

export default function Arms() {
  const activeId = useScrollSpy(content.map((s) => s.id));
  const firstSectionRef = useRef<HTMLDivElement | null>(null);
  const [stickyTop, setStickyTop] = useState(96);

  useLayoutEffect(() => {
    const update = () => {
      if (!firstSectionRef.current) return;
      setStickyTop(firstSectionRef.current.getBoundingClientRect().top);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="w-full py-24">
      {/* HEADING */}
      <div className="flex flex-col items-center max-w-2xl mx-auto mb-20">
        <PlusHeading text="EXECUTION ARMS" size="md" />
        <p className="mt-4 text-xl text-center md:text-3xl text-white leading-tight">
          We take full responsibility for critical outcomes that organisations
          cannot afford to fragment
        </p>
      </div>

      {/* STICKY CONTAINER */}
      <div className="relative max-w-6xl mx-auto bg-white rounded-2xl">
        <div className="flex items-start">
          {/* LEFT */}
          <aside
            className="w-[320px] shrink-0 border-r px-8 py-10 sticky self-start"
            style={{ top: stickyTop }}
          >
            <p className="text-xl font-medium text-black mb-8">
              EXECUTION ARMS
            </p>

            <nav className="space-y-4">
              {content.map((item) => {
                const active = item.id === activeId;

                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      document
                        .getElementById(item.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`block w-full text-left transition-colors ${
                      active
                        ? "text-black font-bold"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </nav>

            <button className="text-black mt-12 inline-flex items-center gap-2 border px-4 py-2 text-sm rounded">
              Learn More →
            </button>
          </aside>

          {/* RIGHT */}
          <div className="flex-1 bg-black text-white rounded-r-2xl">
            {content.map((item, i) => (
              <motion.div
                ref={i === 0 ? firstSectionRef : undefined}
                key={item.id}
                id={item.id}
                className="relative min-h-screen px-20 flex flex-col justify-center border-b border-white/10"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="text-sm text-white/40 mb-4">
                  {item.number}/05
                </span>

                <h2 className="text-4xl font-semibold mb-4">
                  {item.title}
                </h2>

                <p className="text-white/60 max-w-xl">
                  {item.description}
                </p>

                <div className="absolute right-24 top-1/2 -translate-y-1/2 w-80 h-80 border border-white/20 rounded-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
