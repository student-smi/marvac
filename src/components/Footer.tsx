"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import AuraLogo from "./AuraLogo";
import { motion, AnimatePresence } from "framer-motion";
import { useStoreContent } from "@/context/StoreContentContext";

export default function Footer() {
  const { brandSettings } = useStoreContent();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (name: string) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4500);
    }
  };

  return (
    <footer className="bg-[#142B70] text-gray-300 pt-16 pb-12 border-t border-[#0d1e52]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-white/10 gap-6">
          <AuraLogo isDark={true} />
          <p className="text-xs sm:text-sm text-gray-300/80 max-w-md leading-relaxed">
            India&apos;s definitive luxury beauty &amp; salon formulation brand. Engineered for high-stakes bridal artistry, derma-tested skincare, and daily effortless radiance.
          </p>
        </div>

        {/* Desktop 5 Columns matching wireframe: BRAND | SHOP | HELP | COMPANY | NEWSLETTER */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-10 py-12 border-b border-white/10">
          {/* BRAND */}
          <div>
            <h3 className="text-xs font-black text-white tracking-[0.14em] uppercase mb-5">
              BRAND
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#stories" className="hover:text-white transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-white transition-colors">
                  Our Process
                </Link>
              </li>
            </ul>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-xs font-black text-white tracking-[0.14em] uppercase mb-5">
              SHOP
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300/80">
              <li>
                <Link href="/category/hair-styling-products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/category/combos" className="hover:text-white transition-colors">
                  Combos
                </Link>
              </li>
              <li>
                <Link href="/category/hair-styling-products" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/category/combos" className="hover:text-white transition-colors">
                  Custom Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h3 className="text-xs font-black text-white tracking-[0.14em] uppercase mb-5">
              HELP
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300/80">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping-policy" className="hover:text-white transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/policies/refund-policy" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-xs font-black text-white tracking-[0.14em] uppercase mb-5">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms-of-service" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-xs font-black text-white tracking-[0.14em] uppercase mb-5">
              NEWSLETTER
            </h3>
            <p className="text-xs text-gray-300/80 leading-relaxed mb-4">
              Join 35,000+ stylists. Subscribe to receive 10% off your first order and exclusive access.
            </p>

            <form onSubmit={handleSubscribe} className="relative mb-5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-hidden focus:border-sky-300 transition-colors"
              />
              <button
                type="submit"
                aria-label="Submit newsletter subscription"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#2445A8] hover:bg-[#1c357f] text-white rounded-lg flex items-center justify-center transition-colors shadow-2xs"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Thank you! Your 10% code has been emailed.</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden py-6 border-b border-white/10 divide-y divide-white/10">
          {[
            {
              title: "BRAND",
              links: [
                { label: "About", href: "/about" },
                { label: "Stories", href: "#stories" },
                { label: "Contact", href: "/contact" },
              ],
            },
            {
              title: "SHOP",
              links: [
                { label: "Products", href: "/category/hair-styling-products" },
                { label: "Combos", href: "/category/combos" },
                { label: "New Arrivals", href: "/category/hair-styling-products" },
              ],
            },
            {
              title: "HELP",
              links: [
                { label: "Contact", href: "/contact" },
                { label: "Shipping", href: "/policies/shipping-policy" },
                { label: "Returns", href: "/policies/refund-policy" },
              ],
            },
            {
              title: "COMPANY",
              links: [
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Privacy", href: "/policies/privacy-policy" },
              ],
            },
          ].map((sec) => {
            const isOpen = openSection === sec.title;
            return (
              <div key={sec.title} className="py-3">
                <button
                  onClick={() => toggleSection(sec.title)}
                  className="w-full flex items-center justify-between text-left text-xs font-black text-white uppercase tracking-wider focus:outline-hidden py-1"
                >
                  <span>{sec.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 pt-3 pl-2 text-xs text-gray-300/80 overflow-hidden"
                    >
                      {sec.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="block py-1 hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="pt-6 pb-2">
            <h3 className="text-xs font-black text-white tracking-[0.14em] uppercase mb-2">
              NEWSLETTER
            </h3>
            <p className="text-xs text-gray-300/80 mb-3">
              Subscribe for 10% off your first order:
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-hidden"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#2445A8] text-white rounded-lg flex items-center justify-center"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Contact info strip */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10 text-xs text-gray-300/80">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-300" />
              <span>{brandSettings.supportPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-300" />
              <span>{brandSettings.supportEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-300" />
              <span>{brandSettings.address}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            © 2026 {brandSettings.name}. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-gray-400">
            <span>UPI</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>RuPay</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
