"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuraLogo({
  className = "",
  isDark = false,
}: {
  className?: string;
  isDark?: boolean;
}) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 select-none group ${className}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 ${
          isDark ? "bg-white text-[#142B70]" : "bg-[#142B70] text-white"
        }`}
      >
        <Sparkles className={`w-4 h-4 ${isDark ? "text-[#142B70]" : "text-sky-200"}`} />
      </div>
      <div className="flex flex-col">
        <span
          className={`text-xl sm:text-2xl font-black tracking-[0.2em] uppercase leading-none font-sans ${
            isDark ? "text-white" : "text-[#142B70]"
          }`}
        >
          AURA
        </span>
        <span
          className={`text-[9px] font-black tracking-[0.38em] uppercase leading-none mt-1 ${
            isDark ? "text-sky-200" : "text-[#666666]"
          }`}
        >
          BEAUTY
        </span>
      </div>
    </Link>
  );
}
