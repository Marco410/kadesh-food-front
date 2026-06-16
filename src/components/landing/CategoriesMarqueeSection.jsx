import React from "react";
import { LANDING_MARQUEE_CATEGORIES } from "./constants";

export default function CategoriesMarqueeSection() {
  const items = [...LANDING_MARQUEE_CATEGORIES, ...LANDING_MARQUEE_CATEGORIES];

  return (
    <section className="py-8 bg-white border-y border-restro-border-green overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((cat, i) => (
          <span
            key={`${cat}-${i}`}
            className="mx-6 text-lg font-semibold text-restro-green-dark/70 flex items-center gap-6"
          >
            {cat}
            <span className="w-2 h-2 rounded-full bg-restro-green inline-block" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
