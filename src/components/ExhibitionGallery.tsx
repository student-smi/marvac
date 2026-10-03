"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Tag, Users } from "lucide-react";
import { useStoreContent } from "@/context/StoreContentContext";
import { exhibitions as defaultExhibitions } from "@/data/exhibitions";

export default function ExhibitionGallery() {
  const { exhibitions: dynamicExhibitions } = useStoreContent();
  const list = dynamicExhibitions && dynamicExhibitions.length > 0 ? dynamicExhibitions : defaultExhibitions;

  return (
    <section id="exhibitions" className="py-14 sm:py-20 bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1.5">
            ON TOUR ACROSS INDIA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            EXHIBITION HIGHLIGHTS
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5 max-w-lg mx-auto">
            Live demos, masterclasses, and convention showcases with the industry&apos;s finest.
          </p>
        </div>
      </div>

      {/* Full-width continuous smooth marquee rail */}
      <div className="overflow-hidden w-full relative py-2">
        <div className="animate-marquee-slow flex items-stretch gap-4 sm:gap-6 whitespace-nowrap px-4">
          {/* First loop */}
          {list.map((item, idx) => (
            <div
              key={`ex-1-${item.id || idx}-${idx}`}
              className="group relative flex-none w-[240px] sm:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 border border-[#E5E7EB] whitespace-normal select-none"
            >
              <Image
                src={item.image || "/images/exhibition_1.jpg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="280px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-xs text-[#142B70] text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
                  <Tag className="w-3 h-3 text-[#2445A8]" />
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="text-base font-black text-white leading-snug drop-shadow-sm">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-sky-200 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-300 font-normal pt-1">
                  <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{item.attendees}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicated loop for infinite unbroken movement */}
          {list.map((item, idx) => (
            <div
              key={`ex-2-${item.id || idx}-${idx}`}
              className="group relative flex-none w-[240px] sm:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 border border-[#E5E7EB] whitespace-normal select-none"
            >
              <Image
                src={item.image || "/images/exhibition_1.jpg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="280px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-xs text-[#142B70] text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
                  <Tag className="w-3 h-3 text-[#2445A8]" />
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="text-base font-black text-white leading-snug drop-shadow-sm">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-sky-200 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-300 font-normal pt-1">
                  <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{item.attendees}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
