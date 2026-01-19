import pt from "../../messages/pt.json";
import en from "../../messages/en.json";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export type Messages = typeof pt;

const messagesByLocale: Record<Locale, Messages> = {
  pt,
  en,
};

export const isLocale = (value: string): value is Locale => {
  return (locales as readonly string[]).includes(value);
};

export const getMessages = (locale: Locale): Messages => {
  return messagesByLocale[locale];
};

export const getMessage = (
  messages: Messages,
  key: string,
  vars?: Record<string, string | number>
): string => {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, messages);

  if (typeof value !== "string") {
    return key;
  }

  if (!vars) {
    return value;
  }

  return Object.entries(vars).reduce((text, [token, replacement]) => {
    return text.replaceAll(`{{${token}}}`, String(replacement));
  }, value);
};
