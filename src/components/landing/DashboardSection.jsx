import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconLayoutDashboard,
  IconChartBar,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { LANDING_DASHBOARD } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function DashboardSection() {
  const { fadeUp, reduced } = useMotionConfig();
  const { title, description, image, imageAlt, cta, highlights } = LANDING_DASHBOARD;

  return (
    <section id="dashboard" className="py-10 px-4 bg-restro-gray/40">
      <div className="max-w-6xl mx-auto rounded-3xl border border-restro-border-green bg-white/80 p-6 sm:p-10 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-restro-green-10 border border-restro-border-green">
                <IconLayoutDashboard size={22} className="text-restro-green" stroke={1.75} />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-restro-green-10 border border-restro-border-green">
                <IconChartBar size={22} className="text-restro-green" stroke={1.75} />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-restro-green-10 border border-restro-border-green">
                <IconCalendarEvent size={22} className="text-restro-green" stroke={1.75} />
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
            <p className="mt-4 text-restro-text leading-relaxed">{description}</p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-restro-green" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link
              to={cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-restro-green px-6 py-3.5 text-sm font-bold text-white transition hover:bg-restro-green-button-hover active:scale-[0.98] shadow-md"
            >
              {cta.label}
              <IconArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-restro-border-green bg-white"
          >
            <img src={image} alt={imageAlt} className="w-full h-auto" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
