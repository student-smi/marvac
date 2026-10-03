"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { hairGoals } from "@/data/goals";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopByHairGoals() {
  const [selectedGoal, setSelectedGoal] = useState(hairGoals[0]);

  // Filter products by selected goal
  const matchedProducts = products
    .filter((p) => p.hairGoals.includes(selectedGoal.filterKey))
    .slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1.5">
            TARGETED FORMULATION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            SHOP BY HAIR GOALS
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5 max-w-lg mx-auto">
            Choose your hair goal to unlock personalized salon combinations.
          </p>
        </div>
      </div>

      {/* Full-width continuous smooth marquee rail for Goal Cards */}
      <div className="overflow-hidden w-full relative py-2 mb-10">
        <div className="animate-marquee-cards flex items-stretch gap-4 sm:gap-6 whitespace-nowrap px-4">
          {/* First loop */}
          {hairGoals.map((goal, idx) => {
            const isSelected = selectedGoal.id === goal.id;
            return (
              <div
                key={`goal-1-${goal.id}-${idx}`}
                onClick={() => setSelectedGoal(goal)}
                className={`group cursor-pointer flex-none w-[240px] sm:w-[300px] rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between whitespace-normal select-none ${
                  isSelected
                    ? "border-[#142B70] ring-3 ring-[#142B70]/15 shadow-xl bg-white scale-[1.02]"
                    : "border-[#E5E7EB] hover:border-gray-300 bg-white hover:shadow-md"
                }`}
              >
                <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                  <Image
                    src={goal.image}
                    alt={goal.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {isSelected && (
                    <span className="absolute top-3.5 right-3.5 bg-[#142B70] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Selected
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <h3
                    className={`text-sm sm:text-base font-black uppercase tracking-tight ${
                      isSelected ? "text-[#142B70]" : "text-[#111111]"
                    }`}
                  >
                    {goal.name}
                  </h3>
                  <p className="text-xs text-[#666666] font-normal mt-1 leading-snug line-clamp-1">
                    {goal.tagline}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Duplicated loop for infinite unbroken motion */}
          {hairGoals.map((goal, idx) => {
            const isSelected = selectedGoal.id === goal.id;
            return (
              <div
                key={`goal-2-${goal.id}-${idx}`}
                onClick={() => setSelectedGoal(goal)}
                className={`group cursor-pointer flex-none w-[240px] sm:w-[300px] rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between whitespace-normal select-none ${
                  isSelected
                    ? "border-[#142B70] ring-3 ring-[#142B70]/15 shadow-xl bg-white scale-[1.02]"
                    : "border-[#E5E7EB] hover:border-gray-300 bg-white hover:shadow-md"
                }`}
              >
                <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                  <Image
                    src={goal.image}
                    alt={goal.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {isSelected && (
                    <span className="absolute top-3.5 right-3.5 bg-[#142B70] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Selected
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <h3
                    className={`text-sm sm:text-base font-black uppercase tracking-tight ${
                      isSelected ? "text-[#142B70]" : "text-[#111111]"
                    }`}
                  >
                    {goal.name}
                  </h3>
                  <p className="text-xs text-[#666666] font-normal mt-1 leading-snug line-clamp-1">
                    {goal.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Goal Recommended Products Showcase */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF3FF]/30 rounded-3xl p-5 sm:p-8 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2445A8]" />
              <span className="text-xs sm:text-sm font-black text-[#142B70] uppercase tracking-wider">
                Recommended Routine For &ldquo;{selectedGoal.name}&rdquo;
              </span>
            </div>
            <span className="text-xs text-[#666666] font-medium hidden sm:inline">
              Hover goal above to pause
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGoal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5"
            >
              {matchedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
