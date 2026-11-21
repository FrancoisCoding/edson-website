"use client";

import Image from "next/image";
import { useTranslations } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const statsKeys = ["sales", "experience", "clients", "cities"] as const;

export default function AboutSection() {
  const { t } = useTranslations();

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 lg:px-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
            alt={t("about.title")}
            width={800}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {t("about.subtitle")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl">
            {t("about.title")}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("about.body")}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {statsKeys.map((key) => (
              <Card
                key={key}
                className="rounded-2xl border-border/60 bg-card/70 p-4"
              >
                <p className="font-display text-lg">
                  {t(`about.stats.${key}`)}
                </p>
              </Card>
            ))}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-border/70">
                {t("about.cta")}
              </Button>
            </DialogTrigger>
            <DialogContent className="border-border/60 bg-background/95">
              <DialogHeader className="pr-6">
                <DialogTitle className="font-display text-2xl">
                  {t("about.method.title")}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="leading-relaxed">
                {t("about.method.description")} {t("about.method.negotiation")}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
