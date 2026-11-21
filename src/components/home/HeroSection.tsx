"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/I18nProvider";

export default function HeroSection() {
  const { t } = useTranslations();

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] overflow-hidden text-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        <source src="/videos/hero.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(177,18,27,0.25),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-6xl flex-col justify-center px-6 pb-20 pt-40 lg:px-16">
        <p className="text-xs uppercase tracking-[0.5em] text-white/70">
          {t("hero.eyebrow")}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-6xl lg:text-7xl">
          {t("hero.title")}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#contact">{t("hero.ctaPrimary")}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/40 text-white hover:border-white hover:bg-white/10"
          >
            <a href="#listings">{t("hero.ctaSecondary")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
