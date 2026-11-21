"use client";

import Image from "next/image";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import type { Listing } from "@data/listings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "@/components/I18nProvider";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { buildWhatsappUrl } from "@/lib/constants";
import { formatCurrency, formatNumber } from "@/lib/format";

export default function ListingCard({ listing }: { listing: Listing }) {
  const { t, locale } = useTranslations();
  const title = t(`listings.items.${listing.slug}.title`);
  const description = t(`listings.items.${listing.slug}.description`);
  const location = t(`listings.items.${listing.slug}.location`);
  const typeLabel = t(`taxonomy.types.${listing.typeKey}`);

  return (
    <Card className="group overflow-hidden rounded-3xl border-border/60 bg-card/70 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.8)]">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={listing.images[0]}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
        <div className="absolute bottom-5 left-5 space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            {typeLabel}
          </p>
          <h3 className="font-display text-2xl text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            {location}
          </p>
          <p className="font-display text-lg text-primary">
            {formatCurrency(listing.price, locale)}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-white/70" aria-hidden="true" />
            {listing.beds} {t("listings.details.beds")}
          </span>
          <span className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-white/70" aria-hidden="true" />
            {listing.baths} {t("listings.details.baths")}
          </span>
          <span className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-white/70" aria-hidden="true" />
            {formatNumber(listing.area, locale)} {t("listings.details.areaUnit")}
          </span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">{t("listings.details.viewDetails")}</Button>
          </DialogTrigger>
          <DialogContent
            className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] grid-cols-1
              overflow-y-auto overscroll-contain border-border/60 bg-background/95 p-4
              text-foreground sm:max-w-4xl sm:p-6"
          >
            <DialogHeader className="pr-6">
              <DialogTitle className="font-display text-2xl wrap-anywhere sm:text-3xl">
                {title}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  {t("listings.modal.gallery")}
                </p>
                <Carousel className="w-full">
                  <CarouselContent>
                    {listing.images.map((image, index) => (
                      <CarouselItem key={image}>
                        <div className="relative h-60 overflow-hidden rounded-2xl sm:h-72">
                          <Image
                            src={image}
                            alt={`${title} ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="mt-3 flex justify-end gap-2">
                    <CarouselPrevious
                      className="static size-11 translate-y-0"
                      aria-label={t("ui.carouselPrev")}
                    />
                    <CarouselNext
                      className="static size-11 translate-y-0"
                      aria-label={t("ui.carouselNext")}
                    />
                  </div>
                </Carousel>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    {t("listings.modal.descriptionTitle")}
                  </p>
                  <DialogDescription className="mt-3 leading-relaxed">
                    {description}
                  </DialogDescription>
                </div>
                <div className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>{t("listings.details.beds")}</span>
                    <span className="font-display">{listing.beds}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{t("listings.details.baths")}</span>
                    <span className="font-display">{listing.baths}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{t("listings.details.areaLabel")}</span>
                    <span className="font-display">
                      {formatNumber(listing.area, locale)}{" "}
                      {t("listings.details.areaUnit")}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-2 text-sm">
                    <span>{t("listings.filters.price")}</span>
                    <span className="font-display">
                      {formatCurrency(listing.price, locale)}
                    </span>
                  </div>
                </div>
                <Button asChild className="h-auto min-h-9 w-full gap-2 text-center whitespace-normal">
                  <a
                    href={buildWhatsappUrl(title)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    {t("listings.modal.cta")}
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
