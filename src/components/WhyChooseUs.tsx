"use client";

import React from "react";

const features = [
  {
    heading: "Premium Quality",
    description: "Formulated with cosmetic-grade micro-polymers that hold firmly without chalky flakes or heaviness.",
  },
  {
    heading: "Professional Results",
    description: "Tested and refined across hundreds of bridal masterclasses for impeccable 24-hour style security.",
  },
  {
    heading: "Easy Everyday Routine",
    description: "Simple step-by-step application designed to deliver salon-perfect hair in under 5 minutes at home.",
  },
  {
    heading: "Salon Ready",
    description: "Trusted by over 350+ certified academies across India as their mandatory student kit curriculum.",
  },
  {
    heading: "Trusted By Thousands",
    description: "Over 15,000+ bridal artists and happy customers rely on Aura Beauty daily for high-stakes wedding events.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1.5">
            THE AURA STANDARD
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            WHY AURA BEAUTY?
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5">
            Clinically formulated to deliver high-performance beauty and salon control.
          </p>
        </div>
      </div>

      {/* Full-width continuous smooth marquee rail — never pauses, 4 loops for infinite unbroken scroll */}
      <div className="overflow-hidden w-full relative py-2">
        <div className="animate-marquee-slow flex items-stretch gap-4 sm:gap-6 whitespace-nowrap px-4">
          {[0, 1, 2, 3].flatMap((loop) =>
            features.map((feat, idx) => (
              <div
                key={`why-${loop}-${idx}`}
                className="group relative flex-none w-[240px] sm:w-[280px] bg-[#EAF3FF]/30 hover:bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E7EB] hover:border-[#2445A8]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between whitespace-normal select-none hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#142B70] shadow-xs mb-5 group-hover:scale-110 transition-transform">
                    <span className="text-xl font-serif">✦</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-[#111111] uppercase tracking-tight mb-2">
                    {feat.heading}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#666666] font-normal leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-[10px] font-bold text-[#2445A8] uppercase tracking-wider">
                  <span>Certified Standard</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] sm:text-[11px] font-black tracking-widest text-[#2445A8] uppercase opacity-60">
          <span>AUTO SCROLL →</span>
        </div>
      </div>
    </section>
  );
}
