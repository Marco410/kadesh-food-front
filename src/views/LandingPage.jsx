import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isRestroUserAuthenticated } from "../helpers/AuthStatus";
import { getUserDetailsInLocalStorage } from "../helpers/UserDetails";
import { SCOPES } from "../config/scopes";
import useLandingSeo from "../components/landing/useLandingSeo";
import LandingNav from "../components/landing/LandingNav";
import HeroSection from "../components/landing/HeroSection";
import DemoScheduleSection from "../components/landing/DemoScheduleSection";
import CategoriesMarqueeSection from "../components/landing/CategoriesMarqueeSection";
import PainPointsSection from "../components/landing/PainPointsSection";
import PlatformShowcaseSection from "../components/landing/PlatformShowcaseSection";
import DashboardSection from "../components/landing/DashboardSection";
import POSSection from "../components/landing/POSSection";
import KitchenSection from "../components/landing/KitchenSection";
import OrdersSection from "../components/landing/OrdersSection";
import ReservationsSection from "../components/landing/ReservationsSection";
import CustomersSection from "../components/landing/CustomersSection";
import QRMenuSection from "../components/landing/QRMenuSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import InventorySection from "../components/landing/InventorySection";
import InteractiveDemoSection from "../components/landing/InteractiveDemoSection";
import RecommendedSetupSection from "../components/landing/RecommendedSetupSection";
import PersonaBenefitsSection from "../components/landing/PersonaBenefitsSection";
import LandingPricingSection from "../components/landing/LandingPricingSection";
import FAQSection from "../components/landing/FAQSection";
import FinalCTASection from "../components/landing/FinalCTASection";
import LandingFooter from "../components/landing/LandingFooter";
import WhatsAppFloatButton from "../components/landing/WhatsAppFloatButton";

export default function LandingPage() {
  const navigate = useNavigate();
  useLandingSeo();

  useEffect(() => {
    if (!isRestroUserAuthenticated()) return;

    const user = getUserDetailsInLocalStorage();
    if (!user) return;

    const { role, scope } = user;
    if (role === "superadmin") {
      navigate("/superadmin/dashboard/home", { replace: true });
      return;
    }
    if (role === "admin") {
      navigate("/dashboard/home", { replace: true });
      return;
    }
    const userScopes = scope?.split(",") || [];
    if (userScopes.includes(SCOPES.DASHBOARD)) {
      navigate("/dashboard/home", { replace: true });
    } else {
      navigate("/dashboard/profile", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <LandingNav />
      <main>
        <HeroSection />
        <CategoriesMarqueeSection />
        <PlatformShowcaseSection />
        <PainPointsSection />
        <DashboardSection />
        <POSSection />
        <FeaturesSection />
        <KitchenSection />
        <OrdersSection />
        <InventorySection />
        <ReservationsSection />
        <CustomersSection />
        <QRMenuSection />
        <DemoScheduleSection />
        <RecommendedSetupSection />
        <InteractiveDemoSection />
        <PersonaBenefitsSection />
        <LandingPricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
      <WhatsAppFloatButton />
    </div>
  );
}
