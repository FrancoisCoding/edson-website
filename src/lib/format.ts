import type { Locale } from "@/lib/i18n";

export const formatCurrency = (value: number, locale: Locale): string => {
  const formatter = new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
};

export const formatNumber = (value: number, locale: Locale): string => {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US").format(value);
};
