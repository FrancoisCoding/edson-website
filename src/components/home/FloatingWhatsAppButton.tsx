"use client";

import { useTranslations } from "@/components/I18nProvider";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { Button } from "@/components/ui/button";
import { whatsappBaseUrl } from "@/lib/constants";

export default function FloatingWhatsAppButton() {
  const { t } = useTranslations();

  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-[var(--glow)]"
      aria-label={t("ui.whatsapp")}
    >
      <a
        href={whatsappBaseUrl}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsappIcon className="h-6 w-6" />
      </a>
    </Button>
  );
}
