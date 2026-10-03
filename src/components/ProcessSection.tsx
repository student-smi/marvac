"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useStoreContent } from "@/context/StoreContentContext";
import { processStorySteps as defaultSteps } from "@/data/process";
import { CheckCircle2 } from "lucide-react";

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [dotPos, setDotPos] = useState({ x: 60, y: 40 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position through 240vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active step based on 0-33%, 33-66%, 66-100%
  useEffect(() => {
    if (!mounted) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Step switching
      if (latest < 0.33) {
        setActiveStepIndex(0);
      } else if (latest < 0.66) {
        setActiveStepIndex(1);
      } else {
        setActiveStepIndex(2);
      }

      // Move progress dot along the curved SVG path
      if (pathRef.current) {
        try {
          const pathLength = pathRef.current.getTotalLength();
          const point = pathRef.current.getPointAtLength(
            Math.min(pathLength, Math.max(0, latest * pathLength))
          );
          setDotPos({ x: point.x, y: point.y });
        } catch {
          // fallback if path not rendered yet
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, mounted]);

  const { processSteps: dynamicSteps } = useStoreContent();
  const steps = dynamicSteps && dynamicSteps.length > 0 ? dynamicSteps : defaultSteps;
  const activeStep = steps[activeStepIndex] || steps[0];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full h-[260vh] sm:h-[230vh] bg-white border-t border-[#E5E7EB]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#EAF3FF]/20 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] w-full mx-auto relative z-10 py-6 sm:py-0">
          {/* Section Eyebrow & Subtitle matching wireframe: 01 / OUR PROCESS */}
          <div className="text-center mb-6 sm:mb-10">
            <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1">
              THE 3-STEP SALON STANDARD
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
              OUR PROCESS
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] font-normal mt-1 max-w-md mx-auto line-clamp-1 sm:line-clamp-none">
              Scroll through the step-by-step foundation of unshakeable style.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Curved SVG Decorative Path + Large Product Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[280px] sm:min-h-[380px] lg:min-h-[440px]">
              {/* Curved SVG Path with Animated Progress Dot */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-0">
                <svg
                  viewBox="0 0 400 400"
                  className="w-[280px] sm:w-[380px] lg:w-[440px] h-[280px] sm:h-[380px] lg:h-[440px] overflow-visible"
                >
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2445A8" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#142B70" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2445A8" floodOpacity="0.7" />
                    </filter>
                  </defs>

                  {/* Faint Background Guide Arc */}
                  <path
                    d="M 60 40 C 280 80, 320 280, 80 360"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                  />

                  {/* Active Curved Path */}
                  <path
                    ref={pathRef}
                    id="curvedProcessPath"
                    d="M 60 40 C 280 80, 320 280, 80 360"
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Animated Progress Dot moving along the curve */}
                  <circle
                    cx={dotPos.x}
                    cy={dotPos.y}
                    r="8"
                    fill="#142B70"
                    stroke="#ffffff"
                    strokeWidth="3"
                    filter="url(#dotGlow)"
                    className="transition-transform duration-100 ease-out"
                  />
                </svg>
              </div>

              {/* Step Indicators alongside the curve */}
              <div className="absolute right-2 sm:right-6 inset-y-0 flex flex-col justify-between py-6 sm:py-10 z-20 pointer-events-none select-none">
                {["01", "02", "03"].map((stNum, idx) => {
                  const isCurrent = activeStepIndex === idx;
                  return (
                    <div
                      key={stNum}
                      className={`transition-all duration-300 font-black text-xl sm:text-3xl ${
                        isCurrent
                          ? "text-[#142B70] scale-125 translate-x-0 drop-shadow-sm"
                          : "text-gray-300 translate-x-2"
                      }`}
                    >
                      {stNum}
                    </div>
                  );
                })}
              </div>

              {/* Product Visual with fade, scale, and subtle float */}
              <div className="relative w-[200px] sm:w-[280px] lg:w-[320px] aspect-[3/4] z-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.step}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={activeStep.image}
                      alt={activeStep.productName}
                      fill
                      priority
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 640px) 200px, 320px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Floating White Information Card */}
            <div className="lg:col-span-6 z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-[#E5E7EB] shadow-xl space-y-4 max-w-xl mx-auto lg:mx-0"
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="inline-block bg-[#142B70] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-2xs">
                      {activeStep.badge}
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-[#142B70] font-sans">
                      {activeStep.step}
                    </span>
                  </div>

                  {/* Title & Product */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#111111] uppercase tracking-tight">
                      {activeStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#2445A8] mt-0.5">
                      {activeStep.productName}
                    </p>
                  </div>

                  {/* Tagline / Description */}
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                    {activeStep.description}
                  </p>

                  {/* Key Benefits List */}
                  <div className="space-y-1.5 pt-1">
                    {activeStep.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2445A8] shrink-0 mt-0.5" />
                        <span className="text-[11px] sm:text-xs text-[#111111] font-medium leading-tight">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* How to Use Box */}
                  <div className="bg-[#EAF3FF]/40 rounded-xl p-3 border border-[#2445A8]/10 text-[11px] sm:text-xs text-[#666666]">
                    <span className="font-black text-[#142B70] uppercase tracking-wider block mb-0.5">
                      How to use:
                    </span>
                    {activeStep.howToUse}
                  </div>

                  {/* Result Indicator */}
                  <div className="text-[11px] sm:text-xs font-bold text-[#142B70] pt-1">
                    ✨ Result: {activeStep.result}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Visual Step Progress Bar at bottom */}
              <div className="flex items-center gap-2 mt-4 px-2 max-w-xl">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      activeStepIndex === idx
                        ? "bg-[#142B70]"
                        : activeStepIndex > idx
                        ? "bg-[#2445A8]"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
