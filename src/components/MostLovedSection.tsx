"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { hotThisWeek } from "@/data/products";

export default function MostLovedSection() {
  const displayProducts = hotThisWeek.slice(0, 5);

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">
            MOST LOVED PRODUCTS OF THE WEEK
          </h2>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
