import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getPlans, getUserCountry } from "../../controllers/plans.controller";
import PricingPlans from "../../views/PricingPlans";
import { useMotionConfig } from "./useReducedMotionSafe";

export default function LandingPricingSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [planLoading, setPlanLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [country, setCountry] = useState("");
  const { fadeUp } = useMotionConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPlanLoading(true);
        const [plansRes, countryRes] = await Promise.all([
          getPlans(),
          getUserCountry().catch(() => null),
        ]);
        setPlans(plansRes.data.data || []);
        if (countryRes?.data?.result?.country) {
          setCountry(countryRes.data.result.country);
        }
      } catch {
        setPlans([]);
      } finally {
        setPlanLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlanClick = () => {
    navigate("/register");
  };

  return (
    <section id="planes" className="py-5 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-4">
          <span className="inline-block bg-restro-green-10 text-restro-green text-sm font-semibold px-4 py-1 rounded-full mb-6 uppercase">
            {t("inactive_subscription.billing_plans")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Elige el plan perfecto para tu restaurante
          </h2>
          <p className="mt-4 text-lg text-restro-text max-w-2xl mx-auto">
            Todos los planes incluyen prueba gratuita. Sin compromiso, cancela cuando quieras.
          </p>
        </motion.div>

        {planLoading ? (
          <div className="text-center py-16 text-restro-text">
            {t("inactive_subscription.loading_message")}
          </div>
        ) : plans.length > 0 ? (
          <PricingPlans
            isYearly={isYearly}
            onToggle={() => setIsYearly(!isYearly)}
            plans={plans}
            setStripePriceId={() => {}}
            setStripeProductId={() => {}}
            setTrialDays={() => {}}
            setIsTrial={() => {}}
            btnSubscribe={handlePlanClick}
            country={country}
            marketingMode
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-restro-text mb-6">
              Consulta nuestros planes creando una cuenta gratuita.
            </p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="bg-restro-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-restro-green-button-hover"
            >
              Crear cuenta gratis
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
