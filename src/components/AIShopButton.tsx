"use client";

import React, { useState } from "react";
import { Sparkles, X, Bot, ArrowRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function AIShopButton() {
  const { addToCart, setIsCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string>("HOLD MY STYLE");
  const [addedId, setAddedId] = useState<string | null>(null);

  const goals = [
    { label: "HOLD MY STYLE", desc: "Long-lasting 24hr weather defense" },
    { label: "GIVE ME VOLUME", desc: "Root lift and texture without crunch" },
    { label: "SMOOTH & DETANGLE", desc: "Silky glide with zero frizz" },
    { label: "ADD SHINE", desc: "Glossy camera-ready sheen" },
  ];

  const recommendedProducts = products
    .filter((p) => p.hairGoals.includes(selectedGoal))
    .slice(0, 3);

  const handleAdd = (product: (typeof products)[0]) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <>
      {/* Floating Center-Bottom Pill */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
        }}
        className="pointer-events-auto"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.25 }}
          aria-label="Open AI Shopping Assistant"
          className="flex items-center gap-2.5 bg-[#142B70] text-white px-5 py-3 rounded-full shadow-2xl border border-white/20 animate-pulse-subtle focus:outline-hidden"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
          </div>
          <span className="text-xs sm:text-sm font-black tracking-wide uppercase whitespace-nowrap">
            Shop with AI
          </span>
        </motion.button>
      </div>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 max-w-lg mx-auto top-[12%] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh] border border-[#E5E7EB]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#EAF3FF]/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#142B70] text-white flex items-center justify-center shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#111111] uppercase tracking-tight">
                      Aura Beauty AI Stylist
                    </h3>
                    <p className="text-xs text-[#666666]">
                      Personalized routine match in 30 seconds
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Goal Selector */}
              <div className="p-5 border-b border-[#E5E7EB] space-y-2">
                <span className="text-[11px] font-black text-[#666666] uppercase tracking-wider block">
                  Select your primary hair styling goal:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {goals.map((g) => (
                    <button
                      key={g.label}
                      onClick={() => setSelectedGoal(g.label)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        selectedGoal === g.label
                          ? "border-[#142B70] bg-[#EAF3FF]/60 text-[#142B70] font-black shadow-2xs"
                          : "border-[#E5E7EB] bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-xs font-black uppercase tracking-tight line-clamp-1">
                        {g.label}
                      </div>
                      <div className="text-[10px] text-[#666666] mt-0.5 line-clamp-1">
                        {g.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendation List */}
              <div className="p-5 overflow-y-auto space-y-3 flex-1">
                <span className="text-[11px] font-black text-[#666666] uppercase tracking-wider block mb-1">
                  Matched Salon Essentials ({recommendedProducts.length})
                </span>
                {recommendedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-2xl border border-[#E5E7EB] hover:border-[#2445A8]/30 transition-colors bg-white shadow-2xs"
                  >
                    <div className="flex-1 pr-3">
                      <div className="text-xs font-black text-[#111111] line-clamp-1 uppercase">
                        {p.title}
                      </div>
                      <div className="text-xs font-black text-[#142B70] mt-0.5">
                        ₹{p.price.toLocaleString("en-IN")}{" "}
                        <span className="text-[10px] text-gray-400 line-through font-normal">
                          ₹{p.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAdd(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        addedId === p.id
                          ? "bg-emerald-600 text-white"
                          : "bg-[#142B70] hover:bg-[#0d1e52] text-white shadow-xs"
                      }`}
                    >
                      {addedId === p.id ? <Check className="w-3.5 h-3.5" /> : "Add"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#666666]">
                <span>Orders over ₹999 ship free</span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="font-black text-[#142B70] hover:underline flex items-center gap-1 uppercase tracking-wider"
                >
                  View Bag <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
