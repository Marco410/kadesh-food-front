import React from "react";
import { motion } from "framer-motion";
import { IconBox, IconClipboardCheck, IconTrendingUp } from "@tabler/icons-react";
import { LANDING_INVENTORY } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function InventorySection() {
  const { fadeUp, reduced } = useMotionConfig();
  const { title, isNew, tagline, description, image, imageAlt, features } =
    LANDING_INVENTORY;

  return (
    <section id="inventario" className="py-20 px-4 bg-restro-green-light/40">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-restro-border-green shadow-sm">
              <IconClipboardCheck size={22} className="text-restro-green" stroke={1.75} />
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-restro-border-green shadow-sm">
              <IconBox size={22} className="text-restro-green" stroke={1.75} />
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-restro-border-green shadow-sm">
              <IconTrendingUp size={22} className="text-restro-green" stroke={1.75} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
            {isNew && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Nuevo
              </span>
            )}
          </div>

          <p className="mt-4 text-lg font-medium text-gray-800">{tagline}</p>
          <p className="mt-3 text-restro-text leading-relaxed">{description}</p>

          <ul className="mt-8 space-y-5">
            {features.map((feature, i) => (
              <motion.li
                key={feature.title}
                {...fadeUp}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-restro-green" />
                <div>
                  <p className="font-semibold text-gray-900">{feature.title}</p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden shadow-xl border border-restro-border-green bg-white"
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-auto"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
