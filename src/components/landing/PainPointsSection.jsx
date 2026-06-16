import React from "react";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { LANDING_PAIN_POINTS } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function PainPointsSection() {
  const { fadeUp } = useMotionConfig();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-restro-green font-semibold text-sm uppercase tracking-wider">
            Problemas reales
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
            ¿Te suena familiar?
          </h2>
          <p className="mt-4 text-restro-text max-w-2xl mx-auto">
            Los restaurantes en México enfrentan los mismos retos operativos cada día.
            Kadesh FOOD los resuelve en un solo sistema.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {LANDING_PAIN_POINTS.map((item, i) => (
            <motion.div
              key={item.problem}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-restro-border-green p-6 bg-restro-green-light/30 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-gray-900 mb-2">{item.problem}</p>
              <div className="flex items-start gap-2 text-restro-green">
                <IconArrowRight size={18} className="mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
