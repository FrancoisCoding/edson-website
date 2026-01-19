"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/I18nProvider";

export default function SiteHeader() {
  const { t } = useTranslations();

  return (
    <header className="absolute left-0 top-0 z-30 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-16">
        <a
          href="#hero"
          className="font-display text-sm uppercase tracking-[0.4em] text-white"
        >
          {t("site.name")}
        </a>
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.3em] text-white/70 lg:flex">
          <a className="transition hover:text-white" href="#listings">
            {t("nav.listings")}
          </a>
          <a className="transition hover:text-white" href="#about">
            {t("nav.about")}
          </a>
          <a className="transition hover:text-white" href="#testimonials">
            {t("nav.testimonials")}
          </a>
          <a className="transition hover:text-white" href="#contact">
            {t("nav.contact")}
          </a>
        </nav>
        <Button
          asChild
          variant="outline"
          className="border-white/40 text-white hover:border-white hover:bg-white/10"
        >
          <a href="#contact">{t("hero.ctaPrimary")}</a>
        </Button>
      </div>
    </header>
  );
}
