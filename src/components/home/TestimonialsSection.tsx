"use client";

import { useTranslations } from "@/components/I18nProvider";
import { Card } from "@/components/ui/card";

const testimonialKeys = ["t1", "t2", "t3"] as const;

export default function TestimonialsSection() {
  const { t } = useTranslations();

  return (
    <section
      id="testimonials"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 lg:px-16"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl">
            {t("testimonials.title")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonialKeys.map((key) => (
            <Card
              key={key}
              className="flex h-full flex-col justify-between rounded-3xl border-border/60 bg-card/70 p-6"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`testimonials.items.${key}.quote`)}
              </p>
              <div className="mt-6">
                <p className="font-display text-base">
                  {t(`testimonials.items.${key}.name`)}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {t(`testimonials.items.${key}.role`)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
