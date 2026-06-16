import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { LANDING_FAQ } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { fadeUp, reduced } = useMotionConfig();

  return (
    <section id="faq" className="py-4 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-restro-green font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="space-y-3">
          {LANDING_FAQ.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                {...fadeUp}
                transition={{ delay: index * 0.03 }}
                className="border border-restro-border-green rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 hover:bg-restro-green-light/30 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <IconChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-4 text-restro-text leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
