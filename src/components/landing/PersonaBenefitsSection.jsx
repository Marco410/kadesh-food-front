import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";
import { LANDING_PERSONAS } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function PersonaBenefitsSection() {
  const [activeId, setActiveId] = useState(LANDING_PERSONAS[0].id);
  const active = LANDING_PERSONAS.find((p) => p.id === activeId);
  const { fadeUp, reduced } = useMotionConfig();

  return (
    <section id="beneficios" className="py-20 px-4 bg-restro-green-light/40">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-restro-green font-semibold text-sm uppercase tracking-wider">
            Beneficios
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
            Hecho para tu equipo
          </h2>
        </motion.div>

        <div className="flex justify-center gap-3 mb-10">
          {LANDING_PERSONAS.map((persona) => (
            <button
              key={persona.id}
              type="button"
              onClick={() => setActiveId(persona.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeId === persona.id
                  ? "bg-restro-green text-white shadow-md"
                  : "bg-white text-gray-700 border border-restro-border-green"
              }`}
            >
              {persona.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl border border-restro-border-green p-8 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-900">{active.title}</h3>
            <ul className="mt-6 space-y-4">
              {active.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-restro-green-10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <IconCheck size={14} className="text-restro-green" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
