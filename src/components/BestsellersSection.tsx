"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";
import { useStoreContent } from "@/context/StoreContentContext";

const defaultBestsellers: Product[] = [
  {
    id: "bs-1",
    title: "Volumizer Matte Texture Powder 16g",
    handle: "aura-volumizer-matte-powder-16g",
    price: 1299,
    originalPrice: 1799,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 324,
    badge: "BESTSELLER",
    image: "/images/process_01_volumizer.png",
    category: "Hair Styling",
    hairGoals: ["GIVE ME VOLUME", "INSTANT HAIR TRANSFORMATION"],
    description: "Instant root lift and texture without chalky or sticky residue.",
    isBestseller: true,
  },
  {
    id: "bs-2",
    title: "H+ Super Strong Hold Hair Spray 300ml",
    handle: "aura-super-strong-hold-hair-spray-300ml",
    price: 899,
    originalPrice: 1199,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 418,
    badge: "NEW",
    image: "/images/process_05_hspray.png",
    category: "Hair Styling",
    hairGoals: ["HOLD MY STYLE"],
    description: "24-hour style lock with humidity defense. Dries in 3 seconds.",
    isBestseller: true,
  },
  {
    id: "bs-3",
    title: "Body & Bounce Styling Mousse 180ml",
    handle: "aura-hair-styling-mousse-180ml",
    price: 799,
    originalPrice: 999,
    discountPercent: 20,
    rating: 4.7,
    reviewsCount: 186,
    badge: "POPULAR",
    image: "/images/cat_products.png",
    category: "Hair Styling",
    hairGoals: ["GIVE ME VOLUME", "SMOOTH & DETANGLE"],
    description: "Lightweight conditioning foam that adds flexible structural body.",
    isBestseller: true,
  },
  {
    id: "bs-4",
    title: "Professional Styling Essentials Kit",
    handle: "aura-hair-styling-student-kit",
    price: 1499,
    originalPrice: 1999,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 512,
    badge: "BEST VALUE",
    image: "/images/hero_podium.png",
    category: "Combos",
    hairGoals: ["HOLD MY STYLE", "GIVE ME VOLUME"],
    description: "Everything you need to style like a pro. Curated salon collection.",
    isBestseller: true,
  },
];

export default function BestsellersSection() {
  const { products } = useStoreContent();
  const dynamicBestsellers = products?.filter((p) => p.isBestseller) || [];
  const list = dynamicBestsellers.length >= 2 ? dynamicBestsellers.slice(0, 8) : defaultBestsellers;

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
            OUR BESTSELLERS
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-normal mt-1.5">
            Discover our most-loved products
          </p>
        </div>

        {/* 4-column Desktop, 2-column Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
