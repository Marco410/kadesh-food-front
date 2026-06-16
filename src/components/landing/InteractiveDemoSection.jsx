import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { LANDING_DEMO_STEPS } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function InteractiveDemoSection() {
  const [step, setStep] = useState(0);
  const current = LANDING_DEMO_STEPS[step];
  const { fadeUp, reduced } = useMotionConfig();

  const next = () => setStep((s) => Math.min(s + 1, LANDING_DEMO_STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <section id="como-funciona" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-restro-green font-semibold text-sm uppercase tracking-wider">
            Cómo funciona
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
            De la orden al reporte en 4 pasos
          </h2>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10">
          {LANDING_DEMO_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-10 bg-restro-green" : "w-2 bg-restro-border-green"
              }`}
              aria-label={`Paso ${i + 1}: ${s.title}`}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-content"}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <span className="text-restro-green font-bold text-sm">
                Paso {step + 1} de {LANDING_DEMO_STEPS.length}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">{current.title}</h3>
              <p className="mt-3 text-restro-text text-lg">{current.description}</p>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-restro-border-green disabled:opacity-40 hover:bg-restro-gray transition-colors"
                >
                  <IconChevronLeft size={18} />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={step === LANDING_DEMO_STEPS.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-restro-green text-white disabled:opacity-40 hover:bg-restro-green-button-hover transition-colors"
                >
                  Siguiente
                  <IconChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-img"}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl overflow-hidden shadow-xl border border-restro-border-green"
            >
              <img
                src={current.image}
                alt={current.title}
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
