"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import TrustStrip from "@/components/TrustStrip";
import BestsellersSection from "@/components/BestsellersSection";
import CategoryCarousel from "@/components/CategoryCarousel";
import ShopByHairGoals from "@/components/ShopByHairGoals";
import CombosBanner from "@/components/CombosBanner";
import BuildYourKit from "@/components/BuildYourKit";
import WhyChooseUs from "@/components/WhyChooseUs";
import BrandTransitionSection from "@/components/BrandTransitionSection";
import ProcessSection from "@/components/ProcessSection";
import ProductStory from "@/components/ProductStory";
import ShopTheStories from "@/components/ShopTheStories";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import ExhibitionGallery from "@/components/ExhibitionGallery";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans flex flex-col selection:bg-[#EAF3FF] selection:text-[#142B70]">
      {/* 1. Thin Infinite Continuous Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Compact Sticky Navbar */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex-1 w-full">
        {/* 3. Hero Campaign Carousel & Hero Offer */}
        <HeroCarousel />

        {/* 4. Compact Trust Strip */}
        <TrustStrip />

        {/* 5. OUR BESTSELLERS (4-col desktop, 2-col mobile) */}
        <BestsellersSection />

        {/* 6. SHOP BY CATEGORY (Auto-scrolling horizontal carousel) */}
        <CategoryCarousel />

        {/* 7. SHOP BY HAIR GOALS (Visual carousel with recommended filter) */}
        <ShopByHairGoals />

        {/* 8. COMBO PROMOTION (Light blue #EAF3FF campaign visual) */}
        <CombosBanner />

        {/* 9. CUSTOMIZED KITS (2-column mobile cards & wizard) */}
        <BuildYourKit />

        {/* 10. WHY Aura Beauty? (Horizontally scrollable feature cards) */}
        <WhyChooseUs />

        {/* 11. Mosaic Filmstrip & Social Proof */}
        <BrandTransitionSection />

        {/* 12. OUR PROCESS — SCROLL DRIVEN (Sticky viewport, curved SVG path & dot) */}
        <ProcessSection />

        {/* 13. PRODUCT STORY / EDUCATION (Editorial IMAGE|TEXT, TEXT|IMAGE, IMAGE|TEXT) */}
        <ProductStory />

        {/* 14. SHOP THE STORIES (Portrait social video reels) */}
        <ShopTheStories />

        {/* 15. WHAT OUR CUSTOMERS SAY (Auto-slide carousel with avatar cutouts) */}
        <CustomerTestimonials />

        {/* 16. EXHIBITION HIGHLIGHTS (Visual gallery & auto-scroll mobile) */}
        <ExhibitionGallery />

        {/* 17. FREQUENTLY ASKED QUESTIONS (Minimal accordion) */}
        <FAQ />

        {/* 18. FINAL CTA (High conversion upgrade routine) */}
        <FinalCTA />
      </main>

      {/* 19. Dark Navy Footer (#142B70) with mobile accordions */}
      <Footer />

      {/* 20. Floating "Shop with AI" Pill */}
      <FloatingElements />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Instant Search Modal */}
      <SearchModal />
    </div>
  );
}
