import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { supportEmail } from "../../config/config";
import { LANDING_ANCHORS, LANDING_DOMAIN } from "./constants";

export default function LandingFooter() {
  return (
    <footer className="bg-restro-green-dark text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <img src={Logo} alt="Kadesh FOOD" className="h-10 brightness-0 invert mb-4" />
          <p className="text-sm text-white/70">
            Software para restaurantes en México. POS, cocina, inventario y más.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href={LANDING_ANCHORS.plataforma} className="hover:text-white">
                Plataforma
              </a>
            </li>
            <li>
              <a href={LANDING_ANCHORS.planes} className="hover:text-white">
                Planes
              </a>
            </li>
            <li>
              <a href={LANDING_ANCHORS.faq} className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white">
                Crear cuenta
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contacto</h4>
          <p className="text-sm text-white/70">
            <a href={`mailto:${supportEmail}`} className="hover:text-white">
              {supportEmail}
            </a>
          </p>
          <p className="text-sm text-white/70 mt-2">
            <a href={LANDING_DOMAIN} className="hover:text-white">
              food.kadesh.com.mx
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/20 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Kadesh. Todos los derechos reservados.
      </div>
    </footer>
  );
}
