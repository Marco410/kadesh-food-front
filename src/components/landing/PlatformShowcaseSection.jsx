import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LANDING_SHOWCASE_MODULES } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function PlatformShowcaseSection() {
  const [activeId, setActiveId] = useState(LANDING_SHOWCASE_MODULES[0].id);
  const active = LANDING_SHOWCASE_MODULES.find((m) => m.id === activeId);
  const { fadeUp, reduced } = useMotionConfig();

  return (
    <section id="plataforma" className="py-20 px-4 bg-restro-green-light/40">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-restro-green font-semibold text-sm uppercase tracking-wider">
            Plataforma
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
            Todo lo que tu restaurante necesita
          </h2>
          <p className="mt-4 text-restro-text max-w-2xl mx-auto">
            Explora cada módulo del sistema. Un solo software para operar, vender y crecer.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {LANDING_SHOWCASE_MODULES.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => setActiveId(mod.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeId === mod.id
                  ? "bg-restro-green text-white shadow-md"
                  : "bg-white text-gray-700 border border-restro-border-green hover:border-restro-green"
              }`}
            >
              {mod.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-text"}
              initial={reduced ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {active.headline}
              </h3>
              <p className="mt-4 text-restro-text text-lg leading-relaxed">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-img"}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden shadow-xl border border-restro-border-green"
            >
              <img
                src={active.image}
                alt={active.imageAlt}
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
