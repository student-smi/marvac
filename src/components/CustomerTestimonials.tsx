"use client";

import React from "react";
import Image from "next/image";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { useStoreContent } from "@/context/StoreContentContext";
import { testimonials as defaultTestimonials } from "@/data/testimonials";

export default function CustomerTestimonials() {
  const { testimonials: dynamicTestimonials } = useStoreContent();
  const list = dynamicTestimonials && dynamicTestimonials.length > 0 ? dynamicTestimonials : defaultTestimonials;

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
          <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1.5">
            COMMUNITY TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5 max-w-lg mx-auto">
            Over 10,000+ bridal specialists and salons swear by Aura Beauty performance.
          </p>
        </div>
      </div>

      {/* Full-width continuous smooth marquee rail */}
      <div className="overflow-hidden w-full relative pt-14 pb-4">
        <div className="animate-marquee-slow flex items-stretch gap-6 whitespace-nowrap px-4">
          {/* First loop */}
          {list.map((item, idx) => (
            <div
              key={`test-1-${item.id || idx}-${idx}`}
              className="relative flex-none w-[290px] sm:w-[340px] bg-[#EAF3FF]/30 hover:bg-white rounded-3xl p-6 sm:p-7 pt-16 shadow-xs hover:shadow-xl border border-[#E5E7EB] hover:border-[#2445A8]/20 transition-all duration-300 flex flex-col justify-between whitespace-normal select-none"
            >
              <div className="absolute -top-14 left-7 w-24 h-24 rounded-full bg-white p-1 border-2 border-[#2445A8]/20 shadow-md">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-sky-50">
                  <Image
                    src={item.avatar || "/images/person_vaishnavi.png"}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
              </div>

              <div className="absolute top-5 right-6 w-9 h-9 rounded-xl bg-[#142B70] text-white flex items-center justify-center shadow-xs">
                <Quote className="w-4 h-4 fill-white" />
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 stroke-amber-400"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-[13px] text-[#111111] leading-relaxed font-normal mb-5">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#E5E7EB] pt-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#142B70] shrink-0" />
                  <div>
                    <div className="text-xs font-black text-[#111111] uppercase tracking-wider">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#666666] font-medium">
                      {item.role}
                    </div>
                  </div>
                </div>

                {item.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Duplicated loop for infinite unbroken movement */}
          {list.map((item, idx) => (
            <div
              key={`test-2-${item.id || idx}-${idx}`}
              className="relative flex-none w-[290px] sm:w-[340px] bg-[#EAF3FF]/30 hover:bg-white rounded-3xl p-6 sm:p-7 pt-16 shadow-xs hover:shadow-xl border border-[#E5E7EB] hover:border-[#2445A8]/20 transition-all duration-300 flex flex-col justify-between whitespace-normal select-none"
            >
              <div className="absolute -top-14 left-7 w-24 h-24 rounded-full bg-white p-1 border-2 border-[#2445A8]/20 shadow-md">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-sky-50">
                  <Image
                    src={item.avatar || "/images/person_vaishnavi.png"}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
              </div>

              <div className="absolute top-5 right-6 w-9 h-9 rounded-xl bg-[#142B70] text-white flex items-center justify-center shadow-xs">
                <Quote className="w-4 h-4 fill-white" />
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 stroke-amber-400"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-[13px] text-[#111111] leading-relaxed font-normal mb-5">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#E5E7EB] pt-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#142B70] shrink-0" />
                  <div>
                    <div className="text-xs font-black text-[#111111] uppercase tracking-wider">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#666666] font-medium">
                      {item.role}
                    </div>
                  </div>
                </div>

                {item.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] sm:text-[11px] font-black tracking-widest text-[#2445A8] uppercase opacity-60">
          <span>→ CONTINUOUS COMMUNITY STREAM (HOVER TO PAUSE) →</span>
        </div>
      </div>
    </section>
  );
}
