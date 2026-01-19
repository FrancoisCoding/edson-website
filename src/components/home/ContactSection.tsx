"use client";

import { useState } from "react";
import { useTranslations } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const { t } = useTranslations();
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed request");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 lg:px-16"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {t("contact.subtitle")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl">
            {t("contact.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("contact.form.privacy")}
          </p>
        </div>
        <Card className="rounded-3xl border-border/60 bg-card/80 p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground" htmlFor="name">
                {t("contact.form.name")}
              </label>
              <Input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground" htmlFor="email">
                  {t("contact.form.email")}
                </label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground" htmlFor="phone">
                  {t("contact.form.phone")}
                </label>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground" htmlFor="message">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-md border border-border/60 bg-background/70 px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading"
                ? t("contact.form.sending")
                : t("contact.form.submit")}
            </Button>
            {status !== "idle" && (
              <p
                className="text-sm text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                {status === "success"
                  ? t("contact.form.success")
                  : t("contact.form.error")}
              </p>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
}
