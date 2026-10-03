"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useStoreContent } from "@/context/StoreContentContext";
import { categories as defaultCategories } from "@/data/categories";

export default function CategoryCarousel() {
  const { categories: dynamicCategories } = useStoreContent();
  const list = dynamicCategories && dynamicCategories.length > 0 ? dynamicCategories : defaultCategories;

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: SHOP BY CATEGORY ... VIEW ALL → */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1">
              EXPLORE THE RANGE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
              SHOP BY CATEGORY
            </h2>
          </div>

          <Link
            href="/category/hair-styling-hold"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#142B70] hover:text-[#2445A8] uppercase tracking-wider group transition-colors"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Full-width continuous smooth marquee rail */}
      <div className="overflow-hidden w-full relative py-2">
        <div className="animate-marquee-cards flex items-stretch gap-4 sm:gap-6 whitespace-nowrap px-4">
          {/* First sequence of categories */}
          {list.map((cat, idx) => (
            <Link
              key={`cat-1-${cat.id || idx}-${idx}`}
              href={cat.link || `/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="group flex-none w-[170px] sm:w-[220px] bg-[#EAF3FF]/30 hover:bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] hover:border-[#2445A8]/30 transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative w-full aspect-square rounded-xl bg-white flex items-center justify-center p-3 mb-4 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={cat.image || "/images/cat_products.png"}
                  alt={cat.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 170px, 220px"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-black text-[#111111] uppercase tracking-tight group-hover:text-[#2445A8] transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2445A8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-[#666666] font-medium mt-1">
                  {cat.itemCount || 0} Products
                </div>
              </div>
            </Link>
          ))}

          {/* Duplicated sequence for infinite unbroken loop */}
          {list.map((cat, idx) => (
            <Link
              key={`cat-2-${cat.id || idx}-${idx}`}
              href={cat.link || `/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="group flex-none w-[170px] sm:w-[220px] bg-[#EAF3FF]/30 hover:bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] hover:border-[#2445A8]/30 transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative w-full aspect-square rounded-xl bg-white flex items-center justify-center p-3 mb-4 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={cat.image || "/images/cat_products.png"}
                  alt={cat.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 170px, 220px"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-black text-[#111111] uppercase tracking-tight group-hover:text-[#2445A8] transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2445A8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-[11px] text-[#666666] font-medium mt-1">
                  {cat.itemCount || 0} Products
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] sm:text-[11px] font-black tracking-widest text-[#2445A8] uppercase opacity-60">
          <span>→ AUTO SCROLL ACTIVE (HOVER TO PAUSE) →</span>
        </div>
      </div>
    </section>
  );
}
