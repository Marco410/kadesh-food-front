import React from "react";
import { motion } from "framer-motion";
import {
  IconArmchair,
  IconCashRegister,
  IconPrinter,
  IconUsers,
  IconDeviceLaptop,
  IconChefHat,
  IconBox,
  IconAlertTriangle,
  IconSpeakerphone,
  IconBroadcast,
  IconDeviceTablet,
  IconDeviceDesktop,
  IconQrcode,
  IconCloudOff,
} from "@tabler/icons-react";
import { LANDING_FEATURES } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

const FEATURE_ICONS = {
  offline: IconCloudOff,
  reservations: IconArmchair,
  pos: IconCashRegister,
  tickets: IconPrinter,
  customers: IconUsers,
  desktop: IconDeviceLaptop,
  kitchen: IconChefHat,
  inventory: IconBox,
  "stock-alerts": IconAlertTriangle,
  "order-alerts": IconSpeakerphone,
  realtime: IconBroadcast,
  tablet: IconDeviceTablet,
  "multi-display": IconDeviceDesktop,
  "qr-menu": IconQrcode,
};

export default function FeaturesSection() {
  const { fadeUp } = useMotionConfig();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-restro-green font-semibold text-sm uppercase tracking-wider">
            Características
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
            Todo en un solo sistema
          </h2>
          <p className="mt-4 text-restro-text max-w-2xl mx-auto">
            Herramientas pensadas para cada área de tu restaurante, desde el salón hasta la cocina.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {LANDING_FEATURES.map((feature, i) => {
            const Icon = FEATURE_ICONS[feature.id];

            return (
              <motion.div
                key={feature.id}
                {...fadeUp}
                transition={{ delay: i * 0.04 }}
                className="relative flex flex-col items-center rounded-2xl bg-restro-gray/60 border border-restro-border-green/50 p-5 hover:shadow-md transition-shadow"
              >
                {feature.isNew && (
                  <span className="absolute top-3 right-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Nuevo
                  </span>
                )}

                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-restro-border-green/40">
                  <Icon size={36} stroke={1.5} className="text-gray-800" />
                </div>

                <p className="mt-4 text-center text-sm font-semibold text-gray-800 leading-snug">
                  {feature.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
