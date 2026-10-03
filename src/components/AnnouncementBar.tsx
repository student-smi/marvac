"use client";

import React from "react";
import Link from "next/link";
import { useStoreContent } from "@/context/StoreContentContext";

export default function AnnouncementBar() {
  const { announcements } = useStoreContent();

  const items = announcements && announcements.length > 0
    ? announcements
    : [
        { id: "1", text: "FREE SHIPPING ON ORDERS ABOVE ₹999", cta: "SHOP NOW →", link: "/category/hair-styling-hold" },
        { id: "2", text: "NEW AURA COLLECTION NOW AVAILABLE", cta: "EXPLORE →", link: "/category/curated-kits" },
        { id: "3", text: "AURA10 FOR FLAT 10% OFF YOUR FIRST ORDER", cta: "CLAIM →", link: "/products/aura-hair-styling-student-kit" },
        { id: "4", text: "TRUSTED BY 15,000+ BEAUTY EXPERTS ACROSS INDIA", cta: "DISCOVER →", link: "/about" },
      ];

  return (
    <div
      role="region"
      aria-label="Promotional Announcement"
      className="bg-[#142B70] text-white py-2 overflow-hidden border-b border-[#0d1e52] relative z-50 select-none"
    >
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
          {items.map((item, idx) => (
            <div
              key={`ann-1-${item.id || idx}-${idx}`}
              className="flex items-center gap-3 text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] text-white/95"
            >
              <span>{item.text}</span>
              <span className="text-sky-300 font-bold">•</span>
              <Link
                href={item.link}
                className="text-sky-200 hover:text-white transition-colors underline underline-offset-2"
              >
                {item.cta}
              </Link>
              <span className="text-white/30 ml-6">•</span>
            </div>
          ))}

          {/* Repeat for seamless infinite loop */}
          {items.map((item, idx) => (
            <div
              key={`ann-2-${item.id || idx}-${idx}`}
              className="flex items-center gap-3 text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] text-white/95"
            >
              <span>{item.text}</span>
              <span className="text-sky-300 font-bold">•</span>
              <Link
                href={item.link}
                className="text-sky-200 hover:text-white transition-colors underline underline-offset-2"
              >
                {item.cta}
              </Link>
              <span className="text-white/30 ml-6">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
