"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
          />

          {/* Drawer from Right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed top-0 bottom-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1e3a8a]" />
                <h3 className="text-base font-black text-gray-900 tracking-tight">
                  Your Cart ({totalItems})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-sky-50/70 p-4 border-b border-sky-100/60">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add{" "}
                    <span className="text-[#1e3a8a]">
                      ₹{remainingForFreeShipping.toFixed(2)}
                    </span>{" "}
                    more for FREE shipping!
                  </span>
                ) : (
                  <span className="text-emerald-700 flex items-center gap-1">
                    🎉 You qualify for FREE Express Shipping!
                  </span>
                )}
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1e3a8a] transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="font-bold text-gray-900">Your bag is empty</div>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Discover professional styling sprays, student kits, and salon
                    accessories.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-[#1e3a8a] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-start gap-3.5 pb-4 border-b border-gray-100 last:border-none"
                  >
                    {/* Item Image */}
                    <div className="relative w-16 h-16 rounded-xl bg-sky-50 border border-sky-100 shrink-0 overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-contain p-1.5"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <div className="text-xs font-black text-[#1e3a8a] mt-0.5">
                        Rs. {item.product.price.toFixed(2)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2.5">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 text-gray-500 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 text-gray-500 hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-4">
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">
                      Rs. {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600">
                      {remainingForFreeShipping === 0 ? "FREE" : "Rs. 70.00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total (Taxes Incl.)</span>
                    <span className="text-[#1e3a8a]">
                      Rs.{" "}
                      {(
                        subtotal + (remainingForFreeShipping === 0 ? 0 : 70)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                {checkoutSuccess ? (
                  <div className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider text-center shadow-md animate-bounce">
                    ✓ Order Placed Successfully!
                  </div>
                ) : (
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 rounded-xl bg-[#1e3a8a] hover:bg-[#152960] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
