"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStoreContent } from "@/context/StoreContentContext";
import { isInstagramUrl, isVideoUrl, toInstagramEmbedUrl } from "@/lib/mediaUtils";

export default function HeroCarousel() {
  const { heroCampaigns } = useStoreContent();
  const [current, setCurrent] = useState(0);

  const campaigns = heroCampaigns && heroCampaigns.length > 0 ? heroCampaigns : [
    {
      id: "hero-1",
      eyebrow: "AURA LUXURY ESSENTIALS",
      title1: "ONE RITUAL.",
      title2: "TOTAL RADIANCE.",
      description: "Clinically developed skincare & salon-tested finishing essentials engineered for Indian weather. Formulated to deliver 24-hour unshakeable hold and natural gloss without stiffness.",
      bullets: ["Clinically proven efficacy", "Dermatologically tested formulations"],
      price: 1299,
      originalPrice: 1799,
      image: "/images/hero_podium.png",
      ctaText: "SHOP NOW",
      ctaLink: "/products/aura-hair-styling-student-kit",
    },
  ];

  useEffect(() => {
    if (campaigns.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % campaigns.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [campaigns.length]);

  const activeIndex = current < campaigns.length ? current : 0;
  const camp = campaigns[activeIndex];

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-16 lg:py-20 border-b border-[#E5E7EB]">
      {/* Decorative subtle ambient soft glow */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#EAF3FF]/70 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text / Campaign Box Column */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-5"
              >
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-[0.16em] text-[#2445A8] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#2445A8]" />
                  <span>{camp.eyebrow}</span>
                </div>

                {/* Dominant Headline */}
                <h1 className="text-[40px] sm:text-[54px] lg:text-[68px] xl:text-[76px] font-black text-[#111111] tracking-tight leading-[0.98] uppercase">
                  <span>{camp.title1}</span>
                  <br />
                  <span className="text-[#142B70]">{camp.title2}</span>
                </h1>

                {/* Short Premium Description */}
                <p className="text-base sm:text-lg text-[#666666] font-normal leading-[1.6] max-w-xl">
                  {camp.description}
                </p>

                {/* Bullets */}
                <div className="space-y-2 pt-1">
                  {camp.bullets?.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#EAF3FF] text-[#142B70] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#111111]">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
                    ₹{camp.price.toLocaleString("en-IN")}
                  </span>
                  {camp.originalPrice && camp.originalPrice > camp.price && (
                    <>
                      <span className="text-base sm:text-lg text-[#666666] line-through font-semibold">
                        ₹{camp.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-black text-[#2445A8] bg-[#EAF3FF] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        SAVE ₹{camp.originalPrice - camp.price}
                      </span>
                    </>
                  )}
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                  <Link
                    href={camp.ctaLink || "/products/aura-hair-styling-student-kit"}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#142B70] hover:bg-[#0d1e52] text-white px-8 py-4 rounded-xl text-xs sm:text-sm font-black tracking-[0.1em] uppercase transition-all shadow-md hover:shadow-xl hover:gap-3.5 group w-full sm:w-auto"
                  >
                    <span>{camp.ctaText || "SHOP NOW"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/category/hair-styling-hold"
                    className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#142B70] border border-[#E5E7EB] hover:border-[#142B70]/30 px-8 py-4 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-2xs w-full sm:w-auto"
                  >
                    <span>EXPLORE ALL</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Product Composition Column */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Ambient circle glow */}
            <div className="absolute w-[300px] sm:w-[460px] h-[300px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[#EAF3FF] to-white/90 border border-sky-100 shadow-inner -z-0 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={camp.id + "-img"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-[580px] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-4 z-10"
              >
                {isInstagramUrl(camp.image || "") ? (
                  <iframe
                    src={toInstagramEmbedUrl(camp.image || "")}
                    className="w-full h-full rounded-2xl"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                ) : isVideoUrl(camp.image || "") ? (
                  <video
                    src={camp.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className="w-full h-full object-contain rounded-2xl drop-shadow-2xl"
                  />
                ) : (
                  <Image
                    src={camp.image}
                    alt={camp.title1}
                    fill
                    priority
                    loading="eager"
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 580px"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel indicator controls */}
        {campaigns.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + campaigns.length) % campaigns.length)}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {campaigns.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-8 bg-[#142B70]" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % campaigns.length)}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
