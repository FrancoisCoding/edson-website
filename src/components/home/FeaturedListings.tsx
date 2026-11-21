"use client";

import { useMemo, useState } from "react";
import { listings } from "@data/listings";
import ListingCard from "@/components/home/ListingCard";
import { useTranslations } from "@/components/I18nProvider";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/format";

const minPrice = Math.min(...listings.map((listing) => listing.price));
const maxPrice = Math.max(...listings.map((listing) => listing.price));
const priceStep = 100_000;
const initialPriceRange = [minPrice, maxPrice];

const cityOptions = Array.from(new Set(listings.map((listing) => listing.cityKey)));
const typeOptions = Array.from(new Set(listings.map((listing) => listing.typeKey)));

export default function FeaturedListings() {
  const { t, locale } = useTranslations();
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [appliedPriceRange, setAppliedPriceRange] = useState(initialPriceRange);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesCity =
        selectedCity === "all" || listing.cityKey === selectedCity;
      const matchesType =
        selectedType === "all" || listing.typeKey === selectedType;
      const matchesPrice =
        listing.price >= appliedPriceRange[0] && listing.price <= appliedPriceRange[1];
      return matchesCity && matchesType && matchesPrice;
    });
  }, [selectedCity, selectedType, appliedPriceRange]);

  return (
    <section
      id="listings"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 lg:px-16"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {t("listings.subtitle")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl">
            {t("listings.title")}
          </h2>
        </div>

        <Card className="grid gap-4 rounded-3xl border-border/60 bg-card/80 p-5 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("listings.filters.city")}
            </p>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger aria-label={t("listings.filters.city")}>
                <SelectValue placeholder={t("listings.filters.allCities")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("listings.filters.allCities")}</SelectItem>
                {cityOptions.map((city) => (
                  <SelectItem key={city} value={city}>
                    {t(`taxonomy.cities.${city}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("listings.filters.type")}
            </p>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger aria-label={t("listings.filters.type")}>
                <SelectValue placeholder={t("listings.filters.allTypes")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("listings.filters.allTypes")}</SelectItem>
                {typeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`taxonomy.types.${type}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("listings.filters.price")}
              </p>
              <span className="text-xs text-muted-foreground">
                {t("listings.filters.rangeValue", {
                  min: formatCurrency(priceRange[0], locale),
                  max: formatCurrency(priceRange[1], locale),
                })}
              </span>
            </div>
            <Slider
              min={minPrice}
              max={maxPrice}
              step={priceStep}
              value={priceRange}
              onValueChange={setPriceRange}
              onValueCommit={setAppliedPriceRange}
              onPointerUp={() => setAppliedPriceRange(priceRange)}
              onPointerCancel={() => setPriceRange(appliedPriceRange)}
              aria-label={t("listings.filters.price")}
            />
          </div>
        </Card>

        {filteredListings.length === 0 ? (
          <div className="rounded-3xl border border-border/60 bg-card/40 p-10 text-center text-muted-foreground">
            {t("listings.empty")}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
