"use client";

import { useTranslations } from "@/components/I18nProvider";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { Button } from "@/components/ui/button";
import { whatsappBaseUrl } from "@/lib/constants";

export default function FooterSection() {
  const { t } = useTranslations();

  return (
    <footer className="border-t border-border/60 bg-card/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div className="space-y-3">
          <p className="font-display text-2xl">{t("footer.title")}</p>
          <div className="text-sm text-muted-foreground">
            <p>{t("footer.address")}</p>
            <p>{t("footer.email")}</p>
            <p>{t("footer.phone")}</p>
          </div>
        </div>
        <Button asChild className="gap-2">
          <a
            href={whatsappBaseUrl}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsappIcon className="h-4 w-4" />
            {t("footer.cta")}
          </a>
        </Button>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {t("footer.rights")}
      </div>
    </footer>
  );
}
