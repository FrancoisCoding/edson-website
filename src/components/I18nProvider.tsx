"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import type { Locale, Messages } from "@/lib/i18n";
import { getMessage } from "@/lib/i18n";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) => {
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      getMessage(messages, key, vars),
    [messages]
  );

  const value = useMemo(() => ({ locale, messages, t }), [locale, messages, t]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslations = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslations must be used within I18nProvider");
  }
  return context;
};
