"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BrandTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-white py-8 sm:py-12"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale, opacity }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-sky-100"
        >
          {/* Filmstrip Reel Background */}
          <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px]">
            <Image
              src="/images/mosaic_filmstrip.jpg"
              alt="Trusted by stylists and customers"
              fill
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
              priority
            />

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />

            {/* "Trusted by 35L + PEOPLE" Banner Overlay matching frame 29 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
              <div className="flex items-center gap-4 sm:gap-6 bg-black/60 backdrop-blur-md px-6 sm:px-10 py-5 sm:py-7 rounded-2xl border border-white/20 shadow-2xl">
                {/* Mint green accent rectangle bar from reference */}
                <div className="w-3 sm:w-4 h-16 sm:h-20 bg-[#34d399] rounded-full shadow-lg shrink-0" />

                <div className="text-left text-white">
                  <div className="text-xl sm:text-3xl font-extrabold uppercase tracking-widest text-emerald-300">
                    Trusted by
                  </div>
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif">
                    35L + PEOPLE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
