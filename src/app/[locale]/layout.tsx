import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/components/I18nProvider";
import { getMessages, isLocale, locales } from "@/lib/i18n";

export const generateStaticParams = async () => {
  return locales.map((locale) => ({ locale }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const messages = getMessages(locale);
  return {
    title: messages.site.metaTitle,
    description: messages.site.metaDescription,
  };
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <I18nProvider locale={locale} messages={messages}>
      {children}
    </I18nProvider>
  );
}
