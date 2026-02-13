"use client";

import { motion } from "framer-motion";
import { EngagementLabel } from "./data";

type Props = {
  items: readonly EngagementLabel[];
  active: EngagementLabel;
  onChange: (label: EngagementLabel) => void;
};

export default function EngagementMenu({
  items,
  active,
  onChange,
}: Props) {
  return (
    <nav className="menu mb-5 text-[36px] flex flex-col relative">
      {items.map(item => {
        const isActive = active === item;

        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className="relative text-left"
          >
            <span
              className={`transition-colors ${
                isActive ? "text-white" : "text-gray-400"
              }`}
            >
              {item}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
