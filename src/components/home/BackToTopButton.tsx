"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";

const scrollDuration = 320;

export default function BackToTopButton() {
  const { t } = useTranslations();
  const [visible, setVisible] = useState(false);
  const scrollFrame = useRef<number | null>(null);

  const handleScrollToTop = () => {
    if (scrollFrame.current !== null) {
      window.cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = null;
    }

    const shouldReduceMotion =
      document.documentElement.dataset.reduceMotion === "true" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldReduceMotion) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const startPosition = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (timestamp: number) => {
      const progress = Math.min(1, Math.max(0, (timestamp - startTime) / scrollDuration));
      window.scrollTo({ top: startPosition * (1 - progress) ** 3, behavior: "instant" });
      scrollFrame.current = progress < 1 ? window.requestAnimationFrame(animateScroll) : null;
    };

    scrollFrame.current = window.requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed bottom-24 right-6 z-30 h-12 w-12 rounded-full border border-border/60 bg-card/80"
      onClick={handleScrollToTop}
      aria-label={t("ui.backToTop")}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}
