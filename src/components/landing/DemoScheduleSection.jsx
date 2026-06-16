import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconBrandWhatsapp, IconCalendarEvent } from "@tabler/icons-react";
import {
  LANDING_DEMO,
  buildDemoWhatsAppMessage,
  buildWhatsAppUrl,
} from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

function SelectPill({ label, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        isSelected
          ? "border-restro-green bg-restro-green text-white shadow-sm"
          : "border-restro-border-green bg-white text-gray-700 hover:border-restro-green"
      }`}
    >
      {label}
    </button>
  );
}

export default function DemoScheduleSection() {
  const { fadeUp } = useMotionConfig();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const isReady = selectedDay && selectedTime;
  const dayLabel = LANDING_DEMO.days.find((d) => d.id === selectedDay)?.label;
  const timeLabel = LANDING_DEMO.times.find((t) => t.id === selectedTime)?.label;
  const whatsappUrl = isReady
    ? buildWhatsAppUrl(buildDemoWhatsAppMessage(dayLabel, timeLabel))
    : undefined;

  return (
    <section id="demo" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-10">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-restro-green-10 border border-restro-border-green">
            <IconCalendarEvent size={24} className="text-restro-green" stroke={1.75} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {LANDING_DEMO.title}
          </h2>
          <p className="mt-4 text-restro-text leading-relaxed">{LANDING_DEMO.subtitle}</p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="rounded-2xl border border-restro-border-green bg-restro-gray/30 p-6 sm:p-8"
        >
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                {LANDING_DEMO.dayLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {LANDING_DEMO.days.map((day) => (
                  <SelectPill
                    key={day.id}
                    label={day.label}
                    isSelected={selectedDay === day.id}
                    onClick={() => setSelectedDay(day.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                {LANDING_DEMO.timeLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {LANDING_DEMO.times.map((time) => (
                  <SelectPill
                    key={time.id}
                    label={time.label}
                    isSelected={selectedTime === time.id}
                    onClick={() => setSelectedTime(time.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-restro-border-green/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-500">
              {isReady
                ? `Demo solicitada: ${dayLabel} a las ${timeLabel}`
                : LANDING_DEMO.hint}
            </p>

            {isReady ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a] active:scale-[0.98] shadow-md"
              >
                <IconBrandWhatsapp size={20} />
                {LANDING_DEMO.ctaLabel}
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-200 px-6 py-3 text-sm font-bold text-gray-400 cursor-not-allowed"
              >
                <IconBrandWhatsapp size={20} />
                {LANDING_DEMO.ctaLabel}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
