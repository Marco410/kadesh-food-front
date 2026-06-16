import React from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { buildWhatsAppUrl, LANDING_WHATSAPP } from "./constants";

const whatsappUrl = buildWhatsAppUrl(LANDING_WHATSAPP.message);

export default function WhatsAppFloatButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={LANDING_WHATSAPP.label}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#20bd5a] hover:scale-105 active:scale-95"
    >
      <IconBrandWhatsapp size={28} stroke={1.5} />
    </a>
  );
}
