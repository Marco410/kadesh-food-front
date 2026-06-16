import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function FinalCTASection() {
  const { fadeUp } = useMotionConfig();

  return (
    <section id="registro" className="py-20 px-4">
      <motion.div
        {...fadeUp}
        className="max-w-4xl mx-auto text-center bg-restro-green rounded-3xl px-8 py-16 text-white shadow-xl"
      >
        <h2 className="text-3xl lg:text-4xl font-bold">
          Empieza a vender más y administrar menos
        </h2>
        <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
          Crea tu cuenta gratis y prueba Kadesh FOOD. Sin instalaciones complicadas,
          disponible en todo México.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-restro-green font-bold px-8 py-4 rounded-xl hover:bg-restro-green-light transition-colors"
          >
            Crear cuenta gratis
            <IconArrowRight size={20} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
