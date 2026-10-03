"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStoreContent } from "@/context/StoreContentContext";

export default function BrandTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { transitionBanner } = useStoreContent();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.75, 1, 1, 0.95]);

  const badge = transitionBanner?.badge || "TRUSTED BY";
  const headline = transitionBanner?.headline || "35L + PEOPLE";
  const mediaUrl = transitionBanner?.mediaUrl || "/images/mosaic_filmstrip.jpg";
  const mediaType = transitionBanner?.mediaType || (mediaUrl.endsWith(".mp4") || mediaUrl.includes("video") ? "video" : "image");
  const ctaText = transitionBanner?.ctaText || "SHOP WITH AI";
  const ctaLink = transitionBanner?.ctaLink || "/category/hair-styling-hold";

  const isVideo = mediaType === "video" || mediaUrl.endsWith(".mp4") || mediaUrl.startsWith("data:video");

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-white py-8 sm:py-12"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale, opacity }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-sky-100"
        >
          {/* Filmstrip Reel / Video Background */}
          <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px]">
            {isVideo ? (
              <video
                src={mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={mediaUrl}
                alt="Trusted by stylists and customers"
                fill
                className="object-cover"
                sizes="(max-width: 1440px) 100vw, 1440px"
                priority
              />
            )}

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px]" />

            {/* "Trusted by 35L + PEOPLE" Banner Overlay matching frame 29 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex items-center gap-4 sm:gap-6 bg-black/65 backdrop-blur-md px-6 sm:px-10 py-5 sm:py-7 rounded-2xl border border-white/20 shadow-2xl">
                {/* Mint green accent rectangle bar from reference */}
                <div className="w-3 sm:w-4 h-16 sm:h-20 bg-[#34d399] rounded-full shadow-lg shrink-0" />

                <div className="text-left text-white">
                  <div className="text-base sm:text-2xl font-extrabold uppercase tracking-widest text-[#34d399]">
                    {badge}
                  </div>
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif">
                    {headline}
                  </div>
                </div>
              </div>

              {/* + SHOP WITH AI CTA Pill Button */}
              {ctaText && (
                <div className="mt-6">
                  <Link
                    href={ctaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1e3a8a]/90 hover:bg-[#1e3a8a] text-white text-xs sm:text-sm font-black tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>{ctaText}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

