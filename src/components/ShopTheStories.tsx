"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, Play, X, ShoppingBag } from "lucide-react";
import { storyReels as defaultStories, StoryReel } from "@/data/stories";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useStoreContent } from "@/context/StoreContentContext";

export default function ShopTheStories() {
  const { addToCart } = useCart();
  const { storyReels: dynamicStories } = useStoreContent();
  const list = dynamicStories && dynamicStories.length > 0 ? dynamicStories : defaultStories;
  const [activeStory, setActiveStory] = useState<StoryReel | null>(null);

  const handleQuickAdd = (story: StoryReel, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product =
      products.find((p) => p.handle === story.handle) || products[0];
    addToCart(product, 1);
  };

  return (
    <section id="stories" className="py-14 sm:py-20 bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1.5">
            COMMUNITY CREATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            SHOP THE STORIES
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5 max-w-lg mx-auto">
            Real transformations, styling breakdowns, and backstage routines.
          </p>
        </div>
      </div>

      {/* Full-width continuous smooth marquee rail */}
      <div className="overflow-hidden w-full relative py-2">
        <div className="animate-marquee-cards flex items-stretch gap-4 sm:gap-6 whitespace-nowrap px-4">
          {/* First loop */}
          {list.map((story, idx) => (
            <div
              key={`story-1-${story.id}-${idx}`}
              onClick={() => setActiveStory(story)}
              className="group cursor-pointer flex-none w-[180px] sm:w-[230px] flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#2445A8]/30 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 whitespace-normal select-none"
            >
              <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
                {(story.image || story.coverImage || "").endsWith(".mp4") ||
                (story.image || story.coverImage || "").endsWith(".webm") ||
                (story.image || story.coverImage || "").startsWith("data:video") ? (
                  <video
                    src={story.image || story.coverImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Image
                    src={story.image || story.coverImage || "/images/hero_podium.png"}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="230px"
                  />
                )}

                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Eye className="w-3 h-3 text-sky-300" />
                  <span>{story.views || "1.5K"}</span>
                </div>

                <div className="absolute top-2.5 left-2.5 bg-[#142B70]/80 backdrop-blur-xs text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  {story.tag || "STORY"}
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/95 text-[#142B70] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-[#142B70] translate-x-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-gray-100">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-black text-[#111111] truncate uppercase">
                    {story.productName || story.taggedProductTitle || story.title}
                  </div>
                  <div className="text-[11px] text-[#142B70] font-black mt-0.5">
                    ₹{(story.productPrice ?? story.taggedProductPrice ?? 999).toLocaleString("en-IN")}{" "}
                    <span className="text-[9px] text-[#666666] line-through font-normal">
                      ₹{(story.productOriginalPrice ?? story.taggedProductPrice ?? 1499).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleQuickAdd(story, e)}
                  aria-label={`Quick add ${story.productName}`}
                  className="w-7 h-7 rounded-lg bg-[#EAF3FF] hover:bg-[#142B70] text-[#142B70] hover:text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Second loop */}
          {list.map((story, idx) => (
            <div
              key={`story-2-${story.id}-${idx}`}
              onClick={() => setActiveStory(story)}
              className="group cursor-pointer flex-none w-[180px] sm:w-[230px] flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#2445A8]/30 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 whitespace-normal select-none"
            >
              <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
                {(story.image || story.coverImage || "").endsWith(".mp4") ||
                (story.image || story.coverImage || "").endsWith(".webm") ||
                (story.image || story.coverImage || "").startsWith("data:video") ? (
                  <video
                    src={story.image || story.coverImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Image
                    src={story.image || story.coverImage || "/images/hero_podium.png"}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="230px"
                  />
                )}

                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Eye className="w-3 h-3 text-sky-300" />
                  <span>{story.views || "1.5K"}</span>
                </div>

                <div className="absolute top-2.5 left-2.5 bg-[#142B70]/80 backdrop-blur-xs text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  {story.tag || "STORY"}
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/95 text-[#142B70] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-[#142B70] translate-x-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-gray-100">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-black text-[#111111] truncate uppercase">
                    {story.productName || story.taggedProductTitle || story.title}
                  </div>
                  <div className="text-[11px] text-[#142B70] font-black mt-0.5">
                    ₹{(story.productPrice ?? story.taggedProductPrice ?? 999).toLocaleString("en-IN")}{" "}
                    <span className="text-[9px] text-[#666666] line-through font-normal">
                      ₹{(story.productOriginalPrice ?? story.taggedProductPrice ?? 1499).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleQuickAdd(story, e)}
                  aria-label={`Quick add ${story.productName}`}
                  className="w-7 h-7 rounded-lg bg-[#EAF3FF] hover:bg-[#142B70] text-[#142B70] hover:text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Video Modal */}
      <AnimatePresence>
        {activeStory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 max-w-sm mx-auto top-[8%] bg-black rounded-3xl overflow-hidden shadow-2xl z-50 aspect-[9/16] flex flex-col justify-between border border-white/20"
            >
              <div className="p-4 flex items-center justify-between text-white z-10 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                    {activeStory.tag}
                  </span>
                  <span className="text-xs text-gray-300">
                    {activeStory.views}
                  </span>
                </div>
                <button
                  onClick={() => setActiveStory(null)}
                  className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute inset-0">
                {(activeStory.image || activeStory.coverImage || "").endsWith(".mp4") ||
                (activeStory.image || activeStory.coverImage || "").endsWith(".webm") ||
                (activeStory.image || activeStory.coverImage || "").startsWith("data:video") ? (
                  <video
                    src={activeStory.image || activeStory.coverImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={activeStory.image || activeStory.coverImage || "/images/hero_podium.png"}
                    alt={activeStory.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-4 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-10">
                <div className="bg-white rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xl">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-black text-[#111111] truncate uppercase">
                      {activeStory.productName || activeStory.taggedProductTitle || activeStory.title}
                    </div>
                    <div className="text-xs font-black text-[#142B70] mt-0.5">
                      ₹{(activeStory.productPrice ?? activeStory.taggedProductPrice ?? 999).toLocaleString("en-IN")}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(activeStory, e)}
                    className="px-3.5 py-2 rounded-xl bg-[#142B70] hover:bg-[#0d1e52] text-white shadow-sm shrink-0 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
