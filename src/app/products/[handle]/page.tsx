"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Plus,
  Minus,
  Check,
  Sparkles,
  Share2,
} from "lucide-react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import FloatingElements from "@/components/FloatingElements";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.handle === resolvedParams.handle);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "benefits" | "specifications" | "reviews"
  >("description");

  const images = [product.image, product.hoverImage || product.image].filter(
    Boolean
  );

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <CartDrawer />
      <SearchModal />
      <FloatingElements />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/category/hair-styling-products" className="hover:text-blue-900">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold truncate max-w-xs">
            {product.title}
          </span>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 p-1.5 transition-all bg-sky-50/50 ${
                    selectedImage === img
                      ? "border-[#1e3a8a] shadow-xs"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Box */}
            <div className="relative flex-1 aspect-square rounded-3xl bg-gradient-to-b from-[#edf6fc] via-[#f5faff] to-[#e6f3fc] border border-sky-100/80 p-6 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain drop-shadow-xl"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>

              {product.badge && (
                <span className="absolute top-4 right-4 bg-[#00bcd4] text-white text-xs font-black tracking-wider uppercase px-3 py-1 rounded-sm shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Product Details & Buy Area */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                AURA BEAUTY
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1 leading-snug">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 stroke-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-600">
                  5.0 ({product.reviewsCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100/70 flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#102a5c]">
                Rs. {product.price.toFixed(2)}
              </span>
              <span className="text-base text-gray-400 line-through">
                Rs. {product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Save {product.discountPercent}%
              </span>
            </div>

            {/* Short highlight */}
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700 uppercase">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="p-2.5 text-gray-500 hover:text-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="p-2.5 text-gray-500 hover:text-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Buy Now Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? "bg-emerald-600 text-white"
                      : "bg-[#1c357f] hover:bg-[#132766] text-white"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <span>ADD TO CART</span>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 rounded-xl bg-[#00bcd4] hover:bg-[#00acc1] text-white text-xs font-black tracking-wider uppercase transition-all shadow-xs"
                >
                  BUY NOW
                </button>
              </div>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-5 h-5 text-[#1e3a8a] mb-1" />
                <span className="text-[11px] font-bold text-gray-800">
                  Fast Shipping
                </span>
                <span className="text-[10px] text-gray-400">2-4 Days Pan-India</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-[#1e3a8a] mb-1" />
                <span className="text-[11px] font-bold text-gray-800">
                  100% Genuine
                </span>
                <span className="text-[10px] text-gray-400">Direct From Brand</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-5 h-5 text-[#1e3a8a] mb-1" />
                <span className="text-[11px] font-bold text-gray-800">
                  Easy Support
                </span>
                <span className="text-[10px] text-gray-400">WhatsApp & Call</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details: Description, Benefits, Specifications, Reviews */}
        <div className="mt-16 sm:mt-24 border-t border-gray-100 pt-10">
          <div className="flex border-b border-gray-200 gap-6 sm:gap-10 overflow-x-auto scrollbar-none">
            {(
              ["description", "benefits", "specifications", "reviews"] as const
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-black tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === tab
                    ? "border-[#1e3a8a] text-[#1e3a8a]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed max-w-3xl">
                <p>{product.description}</p>
                <p>
                  Crafted for high performance in professional salon styling and
                  bridal makeovers, this formula ensures optimal hold, texture,
                  and finish that stands up to all weather conditions.
                </p>
              </div>
            )}

            {activeTab === "benefits" && (
              <ul className="space-y-2.5 text-sm text-gray-700 max-w-2xl">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24-Hour continuous hold without flaking or stiffness</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Humidity and sweat resistant for Indian weddings and climates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lightweight micro-spray distribution for even coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Brushes out effortlessly at the end of the night without residue</span>
                </li>
              </ul>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-xs sm:text-sm">
                <div className="p-3 bg-gray-50 rounded-xl flex justify-between">
                  <span className="text-gray-500">Brand</span>
                  <span className="font-bold text-gray-900">AURA BEAUTY</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-bold text-gray-900">{product.category}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl flex justify-between">
                  <span className="text-gray-500">Suitable For</span>
                  <span className="font-bold text-gray-900">All Hair Types</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl flex justify-between">
                  <span className="text-gray-500">Country of Origin</span>
                  <span className="font-bold text-gray-900">India</span>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center gap-4 p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
                  <div className="text-3xl font-black text-[#1e3a8a]">5.0</div>
                  <div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 stroke-amber-400"
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Based on {product.reviewsCount} customer ratings
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Pooja V.",
                      date: "2 weeks ago",
                      text: "Absolutely top notch salon quality! Held the bride's updo for over 10 hours without any flyaways.",
                    },
                    {
                      name: "Ananya S.",
                      date: "1 month ago",
                      text: "The best purchase I made this season. Doesn't feel sticky and gives a truly natural premium finish.",
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-4 border border-gray-100 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-900">
                          {rev.name}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {rev.date}
                        </span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className="w-3 h-3 fill-amber-400 stroke-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 pt-1">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 border-t border-gray-100 pt-12">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase mb-8">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
