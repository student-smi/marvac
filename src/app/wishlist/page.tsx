"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function WishlistPage() {
  // Sample wishlist showcase
  const wishlistProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2445A8] hover:underline uppercase tracking-wider mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB] mb-8">
          <div>
            <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1">
              SAVED FOR LATER
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-[#111111] tracking-tight flex items-center gap-3">
              <Heart className="w-7 h-7 text-[#2445A8] fill-[#2445A8]" />
              My Wishlist ({wishlistProducts.length})
            </h1>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
