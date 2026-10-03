"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Check, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      className={`group flex flex-col bg-white rounded-2xl p-2.5 sm:p-3 transition-all duration-300 hover:shadow-lg border border-[#E5E7EB] hover:border-[#2445A8]/20 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link
        href={`/products/${product.handle}`}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-b from-[#EAF3FF]/40 to-[#EAF3FF]/15 flex items-center justify-center p-3 mb-2.5"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {((isHovered && product.hoverImage ? product.hoverImage : product.image) || "").endsWith(".mp4") ||
          ((isHovered && product.hoverImage ? product.hoverImage : product.image) || "").endsWith(".webm") ||
          ((isHovered && product.hoverImage ? product.hoverImage : product.image) || "").startsWith("data:video") ? (
            <video
              src={isHovered && product.hoverImage ? product.hoverImage : product.image}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="w-full h-full object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <Image
              src={isHovered && product.hoverImage ? product.hoverImage : product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw"
              className="object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
        </div>

        {/* Top-Right Badge */}
        {product.badge && (
          <span className="absolute top-2.5 right-2.5 bg-[#142B70] text-white text-[9px] sm:text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-sm shadow-xs z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className="absolute top-2.5 left-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#666666] hover:text-red-500 transition-colors shadow-xs z-10 opacity-0 group-hover:opacity-100"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between space-y-1.5">
        <div>
          {/* Product Name */}
          <Link
            href={`/products/${product.handle}`}
            className="text-xs sm:text-[13px] font-black text-[#111111] line-clamp-1 hover:text-[#2445A8] transition-colors leading-snug"
            title={product.title}
          >
            {product.title}
          </Link>

          {/* Short Description */}
          <p className="text-[11px] text-[#666666] line-clamp-1 font-normal mt-0.5">
            {product.description || "Salon-grade professional formula."}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-amber-400 stroke-amber-400"
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#666666] font-semibold">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline flex-wrap gap-1.5 mt-2">
            <span className="text-sm sm:text-base font-black text-[#111111]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-[#666666] line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-[#2445A8]">
              {product.discountPercent}% OFF
            </span>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all duration-200 mt-2 flex items-center justify-center gap-1.5 ${
            addedAnimation
              ? "bg-emerald-600 text-white"
              : "bg-[#142B70] hover:bg-[#0d1e52] text-white shadow-xs hover:shadow-md"
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>ADDED</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ADD TO CART</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
