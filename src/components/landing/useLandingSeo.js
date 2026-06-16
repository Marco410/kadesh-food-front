import { useEffect } from "react";
import {
  LANDING_DOMAIN,
  LANDING_FAQ,
  SOFTWARE_FEATURE_LIST,
} from "./constants";

const TITLE =
  "Kadesh FOOD — Software para restaurantes en México | POS, cocina e inventario";
const DESCRIPTION =
  "Software para restaurantes en México: POS, cocina en tiempo real, menú QR, inventario, facturas e informes. Prueba gratis en CDMX, Guadalajara y Monterrey.";

function upsertMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function useLandingSeo() {
  useEffect(() => {
    document.title = TITLE;
    upsertMeta("name", "description", DESCRIPTION);
    upsertMeta(
      "name",
      "keywords",
      "software restaurantes México, POS restaurante, sistema cocina, menú QR, inventario restaurante, CRM restaurante, CDMX, Guadalajara, Monterrey"
    );
    upsertMeta("property", "og:title", TITLE);
    upsertMeta("property", "og:description", DESCRIPTION);
    upsertMeta("property", "og:url", `${LANDING_DOMAIN}/`);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", "es_MX");
    upsertMeta("property", "og:image", `${LANDING_DOMAIN}/logo.png`);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", TITLE);
    upsertMeta("name", "twitter:description", DESCRIPTION);
    upsertMeta("name", "twitter:image", `${LANDING_DOMAIN}/logo.png`);
    upsertLink("canonical", `${LANDING_DOMAIN}/`);

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Kadesh",
          url: LANDING_DOMAIN,
          logo: `${LANDING_DOMAIN}/logo.png`,
          sameAs: [],
        },
        {
          "@type": "SoftwareApplication",
          name: "Kadesh FOOD",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: LANDING_DOMAIN,
          description: DESCRIPTION,
          areaServed: { "@type": "Country", name: "México" },
          offers: {
            "@type": "Offer",
            priceCurrency: "MXN",
            availability: "https://schema.org/InStock",
          },
          featureList: SOFTWARE_FEATURE_LIST,
        },
        {
          "@type": "WebPage",
          name: TITLE,
          url: `${LANDING_DOMAIN}/`,
          description: DESCRIPTION,
          inLanguage: "es-MX",
        },
        {
          "@type": "FAQPage",
          mainEntity: LANDING_FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ],
    };

    const scriptId = "landing-jsonld";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, []);
}
