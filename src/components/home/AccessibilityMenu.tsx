"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Accessibility,
  Minus,
  Plus,
  RotateCcw,
  Contrast,
  Activity,
} from "lucide-react";
import { useTranslations } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "luxury-accessibility";
const MIN_FONT = 0.8;
const MAX_FONT = 1.4;
const FONT_STEP = 0.1;

const defaultSettings = {
  fontScale: 1,
  highContrast: false,
  reduceMotion: false,
};

type AccessibilitySettings = typeof defaultSettings;

export default function AccessibilityMenu() {
  const { t, locale } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === "undefined") {
      return defaultSettings;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultSettings;
    }

    try {
      const parsed = JSON.parse(stored) as AccessibilitySettings;
      return {
        ...defaultSettings,
        ...parsed,
      };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.style.fontSize = `${settings.fontScale * 16}px`;
    root.style.setProperty("--font-scale", String(settings.fontScale));

    if (settings.highContrast) {
      root.dataset.contrast = "high";
    } else {
      delete root.dataset.contrast;
    }

    if (settings.reduceMotion) {
      root.dataset.reduceMotion = "true";
    } else {
      delete root.dataset.reduceMotion;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateFontScale = (delta: number) => {
    setSettings((prev) => {
      const next = Math.max(
        MIN_FONT,
        Math.min(MAX_FONT, Number((prev.fontScale + delta).toFixed(2)))
      );
      return { ...prev, fontScale: next };
    });
  };

  const handleLocaleChange = (value: string) => {
    if (value === locale) {
      return;
    }

    const segments = pathname.split("/");
    if (segments.length > 1 && (segments[1] === "pt" || segments[1] === "en")) {
      segments[1] = value;
    } else {
      segments.splice(1, 0, value);
    }
    router.push(segments.join("/") || `/${value}`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 left-6 z-30 h-12 w-12 rounded-full border border-border/60 bg-card/80"
          aria-label={t("accessibility.button")}
        >
          <Accessibility className="h-5 w-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-border/60 bg-background/95 px-7 py-8"
      >
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">
            {t("accessibility.title")}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("accessibility.fontSize")}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateFontScale(-FONT_STEP)}
                aria-label={t("accessibility.decrease")}
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </Button>
              <div className="flex-1 rounded-md border border-border/60 px-3 py-2 text-center text-sm">
                {Math.round(settings.fontScale * 100)}%
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateFontScale(FONT_STEP)}
                aria-label={t("accessibility.increase")}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("accessibility.contrast")}
            </p>
            <Button
              variant={settings.highContrast ? "default" : "outline"}
              className="w-full justify-between"
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  highContrast: !prev.highContrast,
                }))
              }
              aria-pressed={settings.highContrast}
            >
              <span>{t("accessibility.contrast")}</span>
              <Contrast className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("accessibility.motion")}
            </p>
            <Button
              variant={settings.reduceMotion ? "default" : "outline"}
              className="w-full justify-between"
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  reduceMotion: !prev.reduceMotion,
                }))
              }
              aria-pressed={settings.reduceMotion}
            >
              <span>{t("accessibility.motion")}</span>
              <Activity className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("accessibility.language")}
            </p>
            <Select value={locale} onValueChange={handleLocaleChange}>
              <SelectTrigger aria-label={t("accessibility.languageHint")}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">{t("accessibility.pt")}</SelectItem>
                <SelectItem value="en">{t("accessibility.en")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.removeItem(STORAGE_KEY);
              }
              setSettings({ ...defaultSettings });
              router.push("/pt");
            }}
          >
            {t("accessibility.reset")}
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
