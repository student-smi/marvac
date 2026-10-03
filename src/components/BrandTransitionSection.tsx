"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStoreContent } from "@/context/StoreContentContext";

export default function BrandTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { transitionBanner } = useStoreContent();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.95]);

  const badge = transitionBanner?.badge || "TRUSTED BY";
  const headline = transitionBanner?.headline || "35L + PEOPLE";
  const subtitle = transitionBanner?.subtitle || "";
  const mediaUrl = transitionBanner?.mediaUrl || "/images/mosaic_filmstrip.jpg";
  const mediaType = transitionBanner?.mediaType || (mediaUrl.endsWith(".mp4") || mediaUrl.includes(".webm") || mediaUrl.startsWith("data:video") ? "video" : "image");
  const ctaText = transitionBanner?.ctaText || "SHOP WITH AI";
  const ctaLink = transitionBanner?.ctaLink || "/category/hair-styling-hold";

  const isVideo =
    mediaType === "video" ||
    mediaUrl.endsWith(".mp4") ||
    mediaUrl.endsWith(".webm") ||
    mediaUrl.startsWith("data:video") ||
    mediaUrl.includes("blob:");

  // Guarantee seamless video autoplay across all mobile and desktop devices
  useEffect(() => {
    if (isVideo && videoRef.current) {
      const vid = videoRef.current;
      vid.defaultMuted = true;
      vid.muted = true;
      vid.playsInline = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video auto-play delayed until interaction:", err);
        });
      }
    }
  }, [isVideo, mediaUrl]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white py-6 sm:py-10 lg:py-14"
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale, opacity }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-sky-100/80 bg-slate-950"
        >
          {/* Filmstrip Reel / Video Background with fluid responsive height */}
          <div className="relative w-full h-[280px] xs:h-[330px] sm:h-[440px] md:h-[480px] lg:h-[540px]">
            {isVideo ? (
              <video
                ref={videoRef}
                src={mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="auto"
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
            <div className="absolute inset-0 bg-black/50 sm:bg-black/45 backdrop-blur-[0.5px]" />

            {/* "Trusted by 35L + PEOPLE" Banner Overlay matching frame 29 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-6 text-center z-10">
              <div className="max-w-[94%] sm:max-w-xl mx-auto flex items-center gap-3 sm:gap-5 md:gap-6 bg-black/70 backdrop-blur-md px-4 sm:px-8 md:px-10 py-3.5 sm:py-5 md:py-6 rounded-2xl border border-white/20 shadow-2xl">
                {/* Mint green accent rectangle bar from reference */}
                <div className="w-2 sm:w-3 md:w-4 h-11 sm:h-16 md:h-20 bg-[#34d399] rounded-full shadow-lg shrink-0" />

                <div className="text-left text-white min-w-0">
                  <div className="text-xs sm:text-lg md:text-2xl font-extrabold uppercase tracking-widest text-[#34d399]">
                    {badge}
                  </div>
                  <div className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-serif leading-none mt-0.5 sm:mt-1">
                    {headline}
                  </div>
                  {subtitle && (
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 line-clamp-1 max-w-sm">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* + SHOP WITH AI CTA Pill Button */}
              {ctaText && (
                <div className="mt-3.5 sm:mt-6">
                  <Link
                    href={ctaLink}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#1e3a8a]/90 hover:bg-[#1e3a8a] text-white text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase backdrop-blur-md border border-white/25 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
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


