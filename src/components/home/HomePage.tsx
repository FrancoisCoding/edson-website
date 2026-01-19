"use client";

import AboutSection from "@/components/home/AboutSection";
import AccessibilityMenu from "@/components/home/AccessibilityMenu";
import BackToTopButton from "@/components/home/BackToTopButton";
import ContactSection from "@/components/home/ContactSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import FloatingWhatsAppButton from "@/components/home/FloatingWhatsAppButton";
import FooterSection from "@/components/home/FooterSection";
import HeroSection from "@/components/home/HeroSection";
import SiteHeader from "@/components/home/SiteHeader";
import SocialRail from "@/components/home/SocialRail";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(177,18,27,0.25),transparent_70%)] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)] blur-3xl" />
      </div>

      <SiteHeader />
      <main className="flex flex-col gap-24 pb-24">
        <HeroSection />
        <FeaturedListings />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterSection />

      <SocialRail />
      <AccessibilityMenu />
      <BackToTopButton />
      <FloatingWhatsAppButton />
    </div>
  );
}
