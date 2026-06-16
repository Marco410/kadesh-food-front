import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { LANDING_ANCHORS } from "./constants";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function HeroSection() {
  const { t } = useTranslation();
  const { fadeUp } = useMotionConfig();

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-restro-green-light min-h-[85vh] flex items-center"
    >
      <img
        src="/assets/circle_illustration.svg"
        alt=""
        aria-hidden="true"
        className="absolute w-96 lg:w-[900px] h-96 lg:h-[900px] -bottom-48 -right-32 opacity-60 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-restro-green-light via-white/50 to-restro-green-10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div {...fadeUp}>
          <span className="inline-block bg-restro-green-10 text-restro-green text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            Software para restaurantes en México
          </span>
          <h1 className="text-4xl lg:text-6xl font-black text-restro-green-dark leading-tight">
            Kadesh <span className="text-restro-green">FOOD</span>
          </h1>
          <p className="mt-4 text-xl lg:text-2xl font-bold text-gray-800">
            {t("home.cafe_restaurant")} {t("home.hotel_bar")}
          </p>
          <p className="mt-4 text-lg text-restro-text max-w-lg">
            POS, cocina en tiempo real, menú QR, inventario, facturas e informes.
            Todo en la nube, sin instalaciones complicadas.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-restro-green text-white font-semibold px-8 py-4 rounded-xl hover:bg-restro-green-button-hover transition-all hover:scale-[1.02] shadow-lg"
            >
              Probar gratis
              <IconArrowRight size={20} />
            </Link>
            <a
              href={LANDING_ANCHORS.plataforma}
              className="inline-flex items-center justify-center gap-2 border-2 border-restro-green text-restro-green font-semibold px-8 py-4 rounded-xl hover:bg-restro-green-10 transition-colors"
            >
              <IconPlayerPlay size={20} />
              Ver plataforma
            </a>
          </div>

          <p className="mt-6 text-sm text-restro-text">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-restro-green font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/images/food/hero-control.png"
              alt="Panel de control Kadesh FOOD con reportes de restaurante"
              className="w-full h-auto"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-restro-green text-white rounded-xl px-5 py-3 shadow-lg text-sm font-semibold">
            Usuarios y dispositivos ilimitados
          </div>
        </motion.div>
      </div>
    </section>
  );
}
