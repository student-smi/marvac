"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.hairGoals.some((g) => g.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query]);

  const quickSearches = [
    "Student Kit",
    "Strong Hold Spray",
    "Texture Powder",
    "Mousse",
    "Bob Pins",
    "Paddle Brush",
    "Lisbon Dummy",
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 max-w-2xl mx-auto top-20 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-gray-100 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search products, hair goals, tools, pins..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-sm sm:text-base font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 px-2 py-1"
              >
                ESC
              </button>
            </div>

            {/* Quick searches when query is empty */}
            {!query.trim() && (
              <div className="p-5 space-y-3">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-sky-50 hover:text-blue-900 text-xs font-medium text-gray-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query.trim() && (
              <div className="p-4 overflow-y-auto space-y-2 flex-1">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-sky-50/60 transition-colors group"
                    >
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3.5 flex-1 min-w-0"
                      >
                        <div className="relative w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-gray-900 truncate group-hover:text-blue-900">
                            {item.title}
                          </div>
                          <div className="text-xs font-extrabold text-[#1e3a8a] mt-0.5">
                            Rs. {item.price.toFixed(2)}
                            <span className="text-[10px] text-gray-400 line-through ml-2">
                              Rs. {item.originalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </Link>

                      <button
                        onClick={() => {
                          addToCart(item, 1);
                          setIsSearchOpen(false);
                        }}
                        className="p-2 rounded-xl bg-[#1e3a8a] hover:bg-[#14265c] text-white shadow-xs shrink-0 ml-3"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-gray-500 text-sm">
                    No products found matching &quot;{query}&quot;
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
