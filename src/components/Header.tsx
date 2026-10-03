"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Heart } from "lucide-react";
import AuraLogo from "./AuraLogo";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export const primaryNavItems = [
  {
    name: "SHOP",
    href: "/category/hair-styling-products",
    subcategories: [
      { name: "Hair Styling Sprays", href: "/category/hair-styling-products" },
      { name: "Bobby & U-Pins (All Sizes)", href: "/category/hair-pins-clips" },
      { name: "Sectioning & Carbon Clips", href: "/category/hair-pins-clips" },
      { name: "Paddle Brushes & Tail Combs", href: "/category/hair-styling-accessories" },
      { name: "Academy Practice Dummies", href: "/category/practice-academy" },
    ],
  },
  {
    name: "COLLECTIONS",
    href: "/category/combos",
    subcategories: [
      { name: "The Complete Routine (₹999)", href: "/category/combos" },
      { name: "Master Styling Combo (₹1,999)", href: "/category/combos" },
      { name: "Bridal Master Kit", href: "/category/combos" },
      { name: "Student Academy Kits", href: "/category/combos" },
    ],
  },
  {
    name: "ABOUT",
    href: "/about",
    subcategories: [
      { name: "Our Salon Heritage", href: "/about" },
      { name: "The 3-Step Process", href: "#process" },
      { name: "Masterclass & Academy", href: "/about" },
      { name: "Zero Flake Guarantee", href: "/about" },
    ],
  },
  {
    name: "STORIES",
    href: "#stories",
    subcategories: [
      { name: "Stylist Tutorials", href: "#stories" },
      { name: "Bridal Transformations", href: "#stories" },
      { name: "Exhibition Highlights", href: "#exhibitions" },
    ],
  },
];

export default function Header() {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-xs"
            : "bg-white border-b border-[#E5E7EB]/60"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 -ml-2 text-[#111111] hover:text-[#2445A8] transition-colors focus:outline-hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* BRAND LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <AuraLogo />
          </div>

          {/* Desktop Navigation: SHOP, COLLECTIONS, ABOUT, STORIES */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {primaryNavItems.map((item, idx) => (
              <div
                key={item.name}
                className="relative py-5"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-[13px] font-black text-[#111111] hover:text-[#2445A8] tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-lg hover:bg-[#EAF3FF]/50 transition-colors"
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#666666] transition-transform duration-200 ${
                      activeDropdown === idx ? "rotate-180 text-[#2445A8]" : ""
                    }`}
                  />
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-[#E5E7EB] p-3 z-50"
                    >
                      <div className="text-[10px] font-black text-[#666666] uppercase tracking-widest mb-2 px-2">
                        {item.name}
                      </div>
                      <div className="space-y-0.5">
                        {item.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-2.5 py-1.5 text-xs text-[#111111] hover:text-[#2445A8] hover:bg-[#EAF3FF] rounded-lg font-semibold transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Action Icons: 🔍  ♡  👤  🛒 */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog"
              className="p-2 text-[#111111] hover:text-[#2445A8] transition-colors hover:scale-105"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </button>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="p-2 text-[#111111] hover:text-[#2445A8] transition-colors hover:scale-105"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </Link>

            <Link
              href="/account"
              aria-label="Account"
              className="p-2 text-[#111111] hover:text-[#2445A8] transition-colors hover:scale-105"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping bag with ${totalItems} items`}
              className="relative p-2 text-[#111111] hover:text-[#2445A8] transition-colors hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#142B70] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-[300px] bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
                <AuraLogo />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1.5 text-gray-400 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
                {primaryNavItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 pb-3">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-black text-gray-900 hover:text-[#2445A8] mb-2 uppercase tracking-wide"
                    >
                      {item.name}
                    </Link>
                    <div className="pl-3 space-y-2">
                      {item.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs text-gray-600 hover:text-[#2445A8]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-[#E5E7EB] bg-[#EAF3FF]/40 space-y-2">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-800 hover:text-[#2445A8]"
                >
                  <User className="w-4 h-4 text-[#2445A8]" /> My Account & Orders
                </Link>
                <div className="text-[11px] text-gray-500">
                  Concierge Support: +91 98765 43210
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
