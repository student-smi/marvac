"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useStoreContent } from "@/context/StoreContentContext";
import { productStories as defaultStories } from "@/data/productStory";

export default function ProductStory() {
  const { productStories: dynamicStories } = useStoreContent();
  const stories = dynamicStories && dynamicStories.length > 0 ? dynamicStories : defaultStories;

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Section Title */}
        <div className="text-center">
          <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1.5">
            BEHIND THE FORMULATION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            PRODUCT STORY
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5 max-w-lg mx-auto">
            Engineered from salon floor feedback to solve the hardest styling challenges.
          </p>
        </div>

        {/* Stories List (Alternating Left/Right) */}
        {stories.map((story, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={story.id || idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Product Image Column */}
              <div className={`lg:col-span-6 relative ${isEven ? "order-1" : "order-1 lg:order-2"}`}>
                <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-gradient-to-tr from-[#EAF3FF] to-white border border-[#E5E7EB] shadow-md p-6 flex items-center justify-center">
                  {(story.image || "").endsWith(".mp4") ||
                  (story.image || "").endsWith(".webm") ||
                  (story.image || "").startsWith("data:video") ? (
                    <video
                      src={story.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <Image
                      src={story.image || "/images/combo_podium_1999.png"}
                      alt={story.title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                  )}

                  {/* Floating Information Badge */}
                  {(story.floatingBadgeTitle || story.floatingBadgeDesc) && (
                    <div
                      className={`absolute ${
                        isEven ? "bottom-5 left-5" : "top-5 right-5"
                      } bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-sky-100 max-w-[240px]`}
                    >
                      <div className="flex items-center gap-2 text-[#142B70]">
                        {isEven ? (
                          <ShieldCheck className="w-5 h-5 text-[#2445A8]" />
                        ) : (
                          <Zap className="w-5 h-5 text-[#2445A8]" />
                        )}
                        <span className="text-xs font-black uppercase tracking-wider">
                          {story.floatingBadgeTitle || "Clinical Grade"}
                        </span>
                      </div>
                      {story.floatingBadgeDesc && (
                        <p className="text-[11px] text-[#666666] mt-1 leading-snug">
                          {story.floatingBadgeDesc}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Content Column */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? "order-2" : "order-2 lg:order-1"}`}>
                {story.badge && (
                  <div className="inline-block px-3 py-1 rounded-full bg-[#EAF3FF] text-[#2445A8] text-[11px] font-black uppercase tracking-[0.14em]">
                    {story.badge}
                  </div>
                )}

                <h3 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight uppercase leading-[1.05]">
                  {story.title}
                </h3>

                <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed">
                  {story.description}
                </p>

                {/* Benefits Checklist */}
                {story.benefits && story.benefits.length > 0 && (
                  <div className="space-y-3 pt-1">
                    {story.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#EAF3FF] text-[#2445A8] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-sm font-semibold text-[#111111]">{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    href={story.ctaLink || "/category/hair-styling-hold"}
                    className="inline-flex items-center gap-2 bg-[#142B70] hover:bg-[#0d1e52] text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-md hover:shadow-lg group"
                  >
                    <span>{story.ctaText || "LEARN MORE"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
