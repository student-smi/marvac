"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Sparkles, X, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface KitItem {
  id: string;
  name: string;
  itemCountText: string;
  price: number;
  originalPrice: number;
  image: string;
  badge: string;
  subtitle: string;
}

const kitsData: KitItem[] = [
  {
    id: "pro-kit",
    name: "Professional Kit",
    itemCountText: "5 Products",
    price: 1999,
    originalPrice: 2699,
    image: "/images/hero_podium.png",
    badge: "MOST POPULAR",
    subtitle: "H+ Super Hold Spray + texture powder + paddle brush + pins + clips",
  },
  {
    id: "bridal-kit",
    name: "Bridal Master Kit",
    itemCountText: "7 Products",
    price: 2499,
    originalPrice: 3499,
    image: "/images/kit_bridal.jpg",
    badge: "SALON CHOICE",
    subtitle: "Complete bridal hair suite: shine mist, U-pins, carbon tail comb & padding",
  },
  {
    id: "starter-kit",
    name: "Starter Styling Kit",
    itemCountText: "3 Products",
    price: 1299,
    originalPrice: 1799,
    image: "/images/kit_starter.jpg",
    badge: "DAILY USE",
    subtitle: "Detangling brush + lightweight styling mousse + core bobby pin box",
  },
  {
    id: "sleek-kit",
    name: "Sleek Bun Kit",
    itemCountText: "4 Products",
    price: 1599,
    originalPrice: 2199,
    image: "/images/kit_sleek_bun.jpg",
    badge: "ESSENTIALS",
    subtitle: "Anti-frizz hair spray + fine tooth comb + silicone bands + donut bun",
  },
];

export default function BuildYourKit() {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedKit, setSelectedKit] = useState<KitItem | null>(null);
  const [customStep, setCustomStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({
    1: "Aura Core Professional Styling Set",
    2: "Volumizer Matte Powder 16g",
    3: "Sectioning Pro Clips (Pack of 6)",
    4: "Aura H Strong Hold Spray 300ml",
    5: "Aura H+ Super Strong Hold Spray",
  });

  const handleOpenCustomizer = (kit: KitItem) => {
    setSelectedKit(kit);
    setCustomStep(1);
  };

  const handleAddCustomKit = () => {
    addToCart({
      id: `custom-kit-${Date.now()}`,
      title: `${selectedKit?.name || "Custom Kit"} (Personalized)`,
      handle: "aura-hair-styling-student-kit",
      price: selectedKit?.price || 1999,
      originalPrice: selectedKit?.originalPrice || 2699,
      discountPercent: 25,
      rating: 5,
      reviewsCount: 48,
      badge: "CUSTOM KIT",
      image: selectedKit?.image || "/images/hero_podium.png",
      category: "Kits",
      hairGoals: ["HOLD MY STYLE", "GIVE ME VOLUME"],
      description: "Customized professional hair styling kit tailored to your workflow.",
    });
    setSelectedKit(null);
    setIsCartOpen(true);
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching wireframe */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            CUSTOMIZED KITS
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5">
            Curated kits tailored by discipline with flexible customization options.
          </p>
        </div>

        {/* 2-Column Mobile, 2-Column / 4-Column Desktop Cards Grid matching wireframe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {kitsData.map((kit) => (
            <div
              key={kit.id}
              className="group bg-white rounded-3xl border border-[#E5E7EB] hover:border-[#2445A8]/30 p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Kit Image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-[#EAF3FF] to-white p-3 mb-4">
                  <Image
                    src={kit.image}
                    alt={kit.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-[#142B70] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {kit.badge}
                  </span>
                </div>

                {/* Kit Name & Count */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-[#111111] uppercase tracking-tight">
                    {kit.name}
                  </h3>
                  <span className="text-xs font-bold text-[#2445A8]">
                    {kit.itemCountText}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#666666] font-normal mt-1 line-clamp-2 leading-relaxed">
                  {kit.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-3.5">
                  <span className="text-lg font-black text-[#111111]">
                    ₹{kit.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-[#666666] line-through">
                    ₹{kit.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* [ SHOP KIT → ] CTA matching wireframe */}
              <div className="pt-4 mt-3 border-t border-gray-100">
                <button
                  onClick={() => handleOpenCustomizer(kit)}
                  className="w-full py-3 rounded-xl bg-[#142B70] hover:bg-[#0d1e52] text-white text-xs font-black tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md group"
                >
                  <span>SHOP KIT</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal Customizer Wizard */}
      <AnimatePresence>
        {selectedKit && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedKit(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 max-w-2xl mx-auto top-[8%] sm:top-[12%] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85vh] border border-[#E5E7EB]"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#EAF3FF]/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#142B70] text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#111111] uppercase tracking-tight">
                      Customize {selectedKit.name}
                    </h3>
                    <p className="text-xs text-[#666666]">
                      Select your formulation preferences
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedKit(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step indicator bar */}
              <div className="px-5 py-3 bg-gray-50 flex items-center justify-between border-b border-[#E5E7EB] overflow-x-auto scrollbar-none">
                {[1, 2, 3, 4, 5].map((st) => (
                  <button
                    key={st}
                    onClick={() => setCustomStep(st)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                      customStep === st
                        ? "bg-[#142B70] text-white shadow-xs"
                        : customStep > st
                        ? "bg-emerald-100 text-emerald-800"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    <span>Step 0{st}</span>
                    {customStep > st && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>

              {/* Wizard Content Body */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {customStep === 1 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-[#111111] uppercase tracking-wider">
                      Step 01: Core Product Selection
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        "Aura Core Professional Styling Set",
                        "Aura Salon Pro Organizer Master Pack",
                        "Aura Quick-Style Compact Essentials",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, 1: opt }))
                          }
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedOptions[1] === opt
                              ? "border-[#142B70] bg-[#EAF3FF]/40 shadow-xs"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="font-bold text-xs text-[#111111]">
                            {opt}
                          </div>
                          <div className="text-[11px] text-[#666666] mt-0.5">
                            Includes complete professional case & partitions
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {customStep === 2 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-[#111111] uppercase tracking-wider">
                      Step 02: Add Body & Bounce
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        "Volumizer Matte Powder 16g",
                        "Aura Hair Mousse 180ml (Volume & Lift)",
                        "Both Texture Powder + Hair Mousse Duo",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, 2: opt }))
                          }
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedOptions[2] === opt
                              ? "border-[#142B70] bg-[#EAF3FF]/40 shadow-xs"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="font-bold text-xs text-[#111111]">
                            {opt}
                          </div>
                          <div className="text-[11px] text-[#666666] mt-0.5">
                            Lifts roots and creates all-day textured bounce
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {customStep === 3 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-[#111111] uppercase tracking-wider">
                      Step 03: Sectioning & Control Tools
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        "Sectioning Pro Clips (Pack of 6)",
                        "Carbon Antistatic Tail Comb + Croc Clips",
                        "Fine Tooth Precision Pin Tail Comb",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, 3: opt }))
                          }
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedOptions[3] === opt
                              ? "border-[#142B70] bg-[#EAF3FF]/40 shadow-xs"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="font-bold text-xs text-[#111111]">
                            {opt}
                          </div>
                          <div className="text-[11px] text-[#666666] mt-0.5">
                            Smooth clean partitions without creasing hair
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {customStep === 4 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-[#111111] uppercase tracking-wider">
                      Step 04: Lock The Style
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        "Aura H Strong Hold Spray 300ml",
                        "Aura Shine Hair Spray 300ml (Gloss Finish)",
                        "Aura Thermal Heat Shield Spray 180ml",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, 4: opt }))
                          }
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedOptions[4] === opt
                              ? "border-[#142B70] bg-[#EAF3FF]/40 shadow-xs"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="font-bold text-xs text-[#111111]">
                            {opt}
                          </div>
                          <div className="text-[11px] text-[#666666] mt-0.5">
                            Flexible 24hr hold that brushes out clean
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {customStep === 5 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-[#111111] uppercase tracking-wider">
                      Step 05: Super Lock Against Humidity
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        "Aura H+ Super Strong Hold Spray",
                        "Aura Curl Shield & Humidity Barrier",
                        "Complete Spray Shield Bundle",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, 5: opt }))
                          }
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedOptions[5] === opt
                              ? "border-[#142B70] bg-[#EAF3FF]/40 shadow-xs"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="font-bold text-xs text-[#111111]">
                            {opt}
                          </div>
                          <div className="text-[11px] text-[#666666] mt-0.5">
                            Maximum freeze hold against wind and moisture
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 sm:p-5 border-t border-[#E5E7EB] bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#666666] font-medium">
                    Kit Bundle Price:
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#111111]">
                    ₹{selectedKit.price.toLocaleString("en-IN")}{" "}
                    <span className="text-xs text-gray-400 line-through">
                      ₹{selectedKit.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {customStep > 1 && (
                    <button
                      onClick={() => setCustomStep((prev) => prev - 1)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      Back
                    </button>
                  )}
                  {customStep < 5 ? (
                    <button
                      onClick={() => setCustomStep((prev) => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-[#142B70] hover:bg-[#0d1e52] text-white text-xs font-black tracking-wider uppercase transition-colors"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      onClick={handleAddCustomKit}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black tracking-wider uppercase transition-colors shadow-sm flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Add Custom Kit
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
