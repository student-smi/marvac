"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white border-t border-[#E5E7EB] text-center relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#EAF3FF]/70 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF3FF] border border-[#2445A8]/20 text-[#2445A8] text-[11px] font-black tracking-[0.16em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSFORM YOUR STYLING WORKFLOW</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight uppercase leading-[0.98]">
            READY TO UPGRADE
            <br />
            <span className="text-[#142B70]">YOUR ROUTINE?</span>
          </h2>

          <p className="text-base sm:text-xl text-[#666666] font-normal max-w-xl mx-auto">
            Discover the complete salon-tested collection formulated for effortless daily control.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/category/hair-styling-products"
              className="inline-flex items-center justify-center gap-3 bg-[#142B70] hover:bg-[#0d1e52] text-white px-10 py-4.5 rounded-xl text-xs sm:text-sm font-black tracking-[0.12em] uppercase transition-all shadow-md hover:shadow-2xl hover:gap-4 group w-full sm:w-auto"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/category/combos"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#142B70] border border-[#E5E7EB] hover:border-[#142B70]/30 px-8 py-4.5 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-2xs w-full sm:w-auto"
            >
              <span>EXPLORE ALL COMBOS</span>
            </Link>
          </div>

          <div className="pt-4 text-xs font-semibold text-[#666666]">
            Free delivery on orders above ₹999 · 7-day hassle-free returns · Salon approved
          </div>
        </div>
      </div>
    </section>
  );
}
