import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Logo from "../../assets/logo.svg";
import { LANDING_ANCHORS } from "./constants";
import { handleAnchorClick } from "./landingScroll";

const navLinks = [
  { label: "Plataforma", href: LANDING_ANCHORS.plataforma },
  { label: "Cómo funciona", href: LANDING_ANCHORS.comoFunciona },
  { label: "Planes", href: LANDING_ANCHORS.planes },
  { label: "Beneficios", href: LANDING_ANCHORS.beneficios },
  { label: "FAQ", href: LANDING_ANCHORS.faq },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-restro-border-green">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href={LANDING_ANCHORS.inicio}
          className="flex items-center gap-2"
          onClick={handleAnchorClick(LANDING_ANCHORS.inicio)}
        >
          <img src={Logo} alt="Kadesh FOOD" className="h-20  w-20" />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-restro-text hover:text-restro-green transition-colors"
              onClick={handleAnchorClick(link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-restro-text hover:text-restro-green px-4 py-2"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold text-white bg-restro-green hover:bg-restro-green-button-hover px-5 py-2.5 rounded-xl transition-colors"
          >
            Crear cuenta
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-restro-gray"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-restro-border-green bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium py-2"
              onClick={handleAnchorClick(link.href, () => setOpen(false))}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link to="/login" className="text-center py-2 font-semibold border rounded-xl">
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="text-center py-2 font-semibold text-white bg-restro-green rounded-xl"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
