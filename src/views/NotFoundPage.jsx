import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IconArrowLeft,
  IconHome,
  IconLogin,
} from "@tabler/icons-react";
import Page from "../components/Page";
import Logo from "../assets/logo.svg";
import LogoDark from "../assets/LogoDark.svg";
import { iconStroke } from "../config/config";
import { useTheme } from "../contexts/ThemeContext";
import { isRestroUserAuthenticated } from "../helpers/AuthStatus";
import { getUserDetailsInLocalStorage } from "../helpers/UserDetails";

function getHomeTarget() {
  if (!isRestroUserAuthenticated()) {
    return { path: "/login", isLogin: true };
  }

  const user = getUserDetailsInLocalStorage();
  if (user?.role === "superadmin") {
    return { path: "/superadmin/dashboard/home", isLogin: false };
  }

  return { path: "/dashboard/home", isLogin: false };
}

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const home = getHomeTarget();

  return (
    <Page className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-restro-bg-gray/30 px-4 py-10">
      <img
        src="/assets/wave-bg.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 w-full opacity-40"
      />

      <Link
        to={home.path}
        className="relative z-10 mb-8 transition active:scale-95"
      >
        <img
          src={theme === "black" ? LogoDark : Logo}
          alt="Kadesh Food"
          className="h-12 md:h-14"
        />
      </Link>

      <div className="relative z-10 w-full max-w-lg text-center">
        <p
          className="select-none text-[7rem] font-black leading-none tracking-tighter text-restro-green/15 md:text-[9rem]"
          aria-hidden
        >
          404
        </p>

        <img
          src="/assets/illustrations/pos-not-found.webp"
          alt={t("not_found.img_alt")}
          className="relative z-10 mx-auto -mt-16 w-40 md:-mt-20 md:w-52"
        />

        <div className="relative z-10 mt-2 rounded-3xl border border-restro-border-green bg-background px-6 py-8 shadow-sm md:px-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {t("not_found.title")}
          </h1>
          <p className="mt-3 text-base text-restro-text">
            {t("not_found.subtitle")}
          </p>
          <p className="mt-2 text-sm text-gray-500">{t("not_found.hint")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to={home.path}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-restro-border-green bg-restro-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-restro-green-button-hover active:scale-95"
            >
              {home.isLogin ? (
                <IconLogin size={18} stroke={iconStroke} />
              ) : (
                <IconHome size={18} stroke={iconStroke} />
              )}
              {home.isLogin
                ? t("not_found.go_login")
                : t("not_found.go_dashboard")}
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-restro-border-green bg-restro-card-bg px-5 py-3 text-sm font-semibold text-restro-text transition hover:bg-restro-button-hover active:scale-95"
            >
              <IconArrowLeft size={18} stroke={iconStroke} />
              {t("not_found.go_back")}
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}
