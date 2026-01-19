"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";

export default function BackToTopButton() {
  const { t } = useTranslations();
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    const reduceMotion =
      document.documentElement.dataset.reduceMotion === "true";

    if (reduceMotion) {
      window.scrollTo({ top: 0 });
      return;
    }

    const start = window.scrollY;
    const duration = Math.min(1600, Math.max(900, start * 0.6));
    const startTime = performance.now();

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      window.scrollTo({ top: Math.round(start * (1 - eased)) });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed bottom-24 right-6 z-30 h-12 w-12 rounded-full border border-border/60 bg-card/80"
      onClick={scrollToTop}
      aria-label={t("ui.backToTop")}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}
