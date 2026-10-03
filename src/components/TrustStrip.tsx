"use client";

import React from "react";
import { Star, ShieldCheck, Zap, RotateCcw } from "lucide-react";

export default function TrustStrip() {
  const trustPoints = [
    {
      icon: (
        <div className="flex items-center gap-0.5 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
          ))}
        </div>
      ),
      title: "10,000+ CUSTOMERS",
      subtitle: "Rated 4.9/5 by Stylists",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2445A8]" />,
      title: "PREMIUM QUALITY",
      subtitle: "Salon-Grade Formulations",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#2445A8]" />,
      title: "FAST DELIVERY",
      subtitle: "Dispatched within 24 Hours",
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-[#2445A8]" />,
      title: "EASY RETURNS",
      subtitle: "7-Day Hassle-Free Policy",
    },
  ];

  return (
    <section className="bg-white border-y border-[#E5E7EB] py-4 sm:py-5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 ${
                index > 0 ? "pt-3 sm:pt-0 sm:pl-6" : ""
              }`}
            >
              <div className="shrink-0">{point.icon}</div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-black text-[#111111] uppercase tracking-[0.08em] leading-tight">
                  {point.title}
                </div>
                <div className="text-[11px] text-[#666666] font-medium leading-tight mt-0.5">
                  {point.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
