"use client";

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useTranslations } from "@/components/I18nProvider";

const socialLinks = [
  {
    key: "instagram",
    href: "https://www.instagram.com/controleimoveis/",
    Icon: Instagram,
  },
  // {
  //   key: "facebook",
  //   href: "https://www.facebook.com",
  //   Icon: Facebook,
  // },
  // {
  //   key: "linkedin",
  //   href: "https://www.linkedin.com",
  //   Icon: Linkedin,
  // },
  {
    key: "youtube",
    href: "https://www.youtube.com/@Controle-Imoveis",
    Icon: Youtube,
  },
];

export default function SocialRail() {
  const { t } = useTranslations();

  return (
    <div className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
      {socialLinks.map(({ key, href, Icon }) => (
        <a
          key={key}
          href={href}
          aria-label={t(`ui.social.${key}`)}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/60 hover:text-white"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
