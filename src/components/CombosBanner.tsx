"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Award,
  ArrowRight,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";
import { comboSlides } from "@/data/siteData";
import { motion, AnimatePresence } from "framer-motion";

export default function CombosBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = comboSlides[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? comboSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % comboSlides.length);
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Campaign Banner Container on Light Blue (#EAF3FF) */}
        <div className="relative rounded-3xl overflow-hidden bg-[#EAF3FF] border border-[#2445A8]/15 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 lg:p-14 relative"
            >
              {/* Left Content Area */}
              <div className="lg:col-span-7 z-10 space-y-6">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-[#142B70] text-[11px] font-black tracking-[0.14em] uppercase border border-sky-200/60 shadow-2xs">
                  <span>CURATED SALON BUNDLE</span>
                  <span className="text-[#2445A8]">•</span>
                  <span>SAVE UP TO 28%</span>
                </div>

                {/* Campaign Headline */}
                <div>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight uppercase leading-[0.98]">
                    THE COMPLETE ROUTINE
                  </h2>
                  <p className="text-base sm:text-xl text-[#2445A8] font-bold mt-2">
                    Everything you need. One curated kit.
                  </p>
                </div>

                {/* Offer Price Box */}
                <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-xs px-5 py-3 rounded-2xl border border-sky-100 shadow-sm">
                  <div>
                    <span className="text-[10px] text-[#666666] font-bold uppercase tracking-wider block">
                      Bundle Price
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-[#142B70] tracking-tight">
                      ₹{slide.price}
                    </span>
                  </div>
                  <div className="h-9 w-px bg-gray-200" />
                  <div className="text-left">
                    <span className="text-[10px] bg-[#142B70] text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {slide.badge}
                    </span>
                    <span className="text-xs text-[#666666] font-medium block mt-1">
                      Includes 4 Full-Size Items
                    </span>
                  </div>
                </div>

                {/* Included Items Grid */}
                <div className="grid grid-cols-2 gap-3 max-w-md pt-1">
                  {slide.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2445A8] shrink-0" />
                      <span className="text-xs font-bold text-[#111111] uppercase tracking-tight">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTA & Trust points */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/products/aura-hair-styling-student-kit"
                    className="inline-flex items-center gap-3 bg-[#142B70] hover:bg-[#0d1e52] text-white px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-md hover:shadow-xl hover:gap-4 group"
                  >
                    <span>SHOP COMBOS</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="flex items-center gap-3 text-[11px] font-bold text-[#666666]">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-[#2445A8]" />
                      <span>Salon Quality</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#2445A8]" />
                      <span>Daily Use</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Product Composition Visual */}
              <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center mt-6 lg:mt-0">
                {(() => {
                  const mediaSrc = slide.podiumImage || slide.bannerImage || "/images/complete_routine_podium.jpg";
                  const isVid =
                    mediaSrc.startsWith("data:video") ||
                    mediaSrc.startsWith("blob:") ||
                    /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i.test(mediaSrc) ||
                    mediaSrc.includes(".mp4") ||
                    mediaSrc.includes(".webm");

                  if (isVid) {
                    return (
                      <video
                        src={mediaSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                        className="w-full h-full max-h-[460px] object-contain drop-shadow-2xl rounded-2xl"
                      />
                    );
                  }

                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaSrc}
                      alt={slide.title}
                      className="w-full h-full max-h-[460px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/complete_routine_podium.jpg";
                      }}
                    />
                  );
                })()}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20 bg-white/90 backdrop-blur-xs px-4 py-1.5 rounded-full border border-sky-100 shadow-xs">
            <button
              onClick={handlePrev}
              aria-label="Previous combo"
              className="text-[#666666] hover:text-[#111111] transition-colors p-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Slider track indicator */}
            <div className="w-24 sm:w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#142B70] transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentSlide + 1) / comboSlides.length) * 100}%`,
                }}
              />
            </div>

            <button
              onClick={handleNext}
              aria-label="Next combo"
              className="text-[#666666] hover:text-[#111111] transition-colors p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
