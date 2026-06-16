import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconCloudOff,
  IconRefresh,
  IconWifiOff,
} from "@tabler/icons-react";
import { LANDING_OFFLINE } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function OfflineModeSection() {
  const { fadeUp, reduced } = useMotionConfig();
  const {
    eyebrow,
    isNew,
    title,
    tagline,
    description,
    image,
    imageAlt,
    steps,
    features,
    cta,
  } = LANDING_OFFLINE;

  return (
    <section id="modo-offline" className="py-20 px-4 bg-amber-50/80">
      <div className="max-w-6xl mx-auto rounded-3xl border border-amber-200 bg-white/90 p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div {...fadeUp}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                <IconWifiOff size={22} className="text-amber-700" stroke={1.75} />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                <IconCloudOff size={22} className="text-amber-700" stroke={1.75} />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
                <IconRefresh size={22} className="text-amber-700" stroke={1.75} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
                {eyebrow}
              </span>
              {isNew && (
                <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Nuevo
                </span>
              )}
            </div>

            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
            <p className="mt-4 text-lg font-medium text-gray-800">{tagline}</p>
            <p className="mt-3 text-restro-text leading-relaxed">{description}</p>

            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
              <IconCloudOff size={20} className="text-amber-700 flex-shrink-0 mt-0.5" stroke={1.75} />
              <div>
                <p className="font-semibold text-sm text-amber-900">Modo sin conexión</p>
                <p className="text-sm text-amber-800/90 mt-1">
                  Puedes tomar pedidos y cobrar. Se sincronizarán automáticamente al reconectar.
                </p>
              </div>
            </div>

            <ol className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  {...fadeUp}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800 border border-amber-200">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{step.title}</p>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <Link
              to={cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-restro-green px-6 py-3.5 text-sm font-bold text-white transition hover:bg-restro-green-button-hover active:scale-[0.98] shadow-md"
            >
              {cta.label}
              <IconArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden shadow-xl border border-amber-200 bg-white"
            >
              <img src={image} alt={imageAlt} className="w-full h-auto" loading="lazy" />
            </motion.div>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.title}
                  {...fadeUp}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-restro-border-green/60 bg-restro-gray/40 p-4"
                >
                  <p className="font-semibold text-gray-900">{feature.title}</p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
