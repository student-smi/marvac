"use client";

import React, { use } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import FloatingElements from "@/components/FloatingElements";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const resolvedParams = use(params);
  const handle = resolvedParams.handle;

  // Format title from handle
  const title = handle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Filter products matching this category
  const filtered = products.filter((p) => {
    const q = handle.replace(/-/g, " ").toLowerCase();
    return (
      p.category.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.hairGoals.some((g) => g.toLowerCase().includes(q))
    );
  });

  const displayList = filtered.length > 0 ? filtered : products.slice(0, 15);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <CartDrawer />
      <SearchModal />
      <FloatingElements />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-900">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">{title}</span>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase">
            {title}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Showing {displayList.length} professional salon-grade products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {displayList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
