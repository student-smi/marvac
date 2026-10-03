"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useStoreContent } from "@/context/StoreContentContext";
import { faqs as defaultFaqs } from "@/data/faqs";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const { faqs: dynamicFaqs } = useStoreContent();
  const list = dynamicFaqs && dynamicFaqs.length > 0 ? dynamicFaqs : defaultFaqs;
  const [openId, setOpenId] = useState<string | null>(list[0]?.id || "faq-1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1.5">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            FAQ
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5">
            Everything you need to know about our products, routines, and policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {list.map((faq, idx) => {
            const fid = faq.id || `faq-${idx}`;
            const isOpen = openId === fid;
            return (
              <div
                key={fid}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#142B70]/30 bg-[#EAF3FF]/25 shadow-xs"
                    : "border-[#E5E7EB] bg-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggle(fid)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-hidden"
                >
                  <span className="text-sm sm:text-base font-black text-[#111111] tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? "bg-[#142B70] text-white"
                        : "bg-gray-100 text-[#666666]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-sky-100/60 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
