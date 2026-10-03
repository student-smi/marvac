"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  Tag,
  CheckCircle2,
  AlertCircle,
  Lock,
  ChevronRight,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import AuraLogo from "@/components/AuraLogo";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    message: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Shipping calculation (Free over ₹999)
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 70;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  // Autofill user details if logged in
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setFormData((prev) => ({
            ...prev,
            name: data.user.name || prev.name,
            email: data.user.email || prev.email,
            phone: data.user.phone || prev.phone,
            address: data.user.address || prev.address,
            city: data.user.city || prev.city,
            state: data.user.state || prev.state,
            pincode: data.user.pincode || prev.pincode,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleApplyCoupon = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!couponInput.trim()) return;

    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupons/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim(), cartTotal: subtotal }),
      });
      const data = await res.json();

      if (data.valid) {
        setAppliedCoupon({
          code: data.code,
          discount: data.discount,
          message: data.message,
        });
        setCouponInput("");
      } else {
        setCouponError(data.message || "Invalid coupon code");
      }
    } catch {
      setCouponError("Could not apply coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please enter your name, email, and 10-digit mobile number.");
      return;
    }

    if (!formData.address.trim() || !formData.pincode.trim()) {
      setErrorMessage("Please enter your complete delivery address and PIN code.");
      return;
    }

    if (formData.pincode.trim().length !== 6) {
      setErrorMessage("Please enter a valid 6-digit Indian PIN code.");
      return;
    }

    if (cart.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: `${formData.address}${formData.apartment ? ", " + formData.apartment : ""}`,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          items: cart,
          subtotal,
          shippingFee,
          discountAmount,
          couponCode: appliedCoupon?.code,
          totalAmount: finalTotal,
          paymentMethod: paymentMethod === "COD" ? "Cash on Delivery (COD)" : "Online Payment (Pending)",
        }),
      });

      const data = await res.json();

      if (data.success && data.orderId) {
        clearCart();
        router.push(`/order-success/${data.orderId}`);
      } else {
        setErrorMessage(data.error || "Failed to process order. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("A network error occurred. Please check your connection.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AuraLogo />
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-[#142B70] tracking-wider uppercase">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2445A8] hover:underline uppercase tracking-wider mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Store</span>
        </Link>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto border border-[#E5E7EB] shadow-xs">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-black uppercase text-[#111111]">Your Cart is Empty</h2>
            <p className="text-sm text-[#666666] mt-2 mb-6">
              Looks like you haven&apos;t added any salon essentials to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#142B70] hover:bg-[#2445A8] text-white text-xs font-black uppercase tracking-widest transition-all shadow-md"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Customer & Delivery Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Contact Info */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#111111] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#142B70] text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    Contact Information
                  </h2>
                  <Link href="/login" className="text-xs font-bold text-[#2445A8] hover:underline">
                    Have an account? Log in
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Mobile Number (For Delivery SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address (For Order Invoice) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. pooja@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E5E7EB]">
                  <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#111111] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#142B70] text-white text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Flat / House No. / Building / Street *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 402, Crystal Heights, Link Road"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 400053"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E5E7EB]">
                  <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#111111] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#142B70] text-white text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Option 1: COD (Active) */}
                  <label
                    onClick={() => setPaymentMethod("COD")}
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-[#142B70] bg-[#EAF3FF]/40"
                        : "border-[#E5E7EB] hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === "COD"
                              ? "border-[#142B70] bg-[#142B70]"
                              : "border-gray-400"
                          }`}
                        >
                          {paymentMethod === "COD" && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="text-sm font-black text-[#111111] uppercase tracking-wide">
                            Cash on Delivery (Pay on Delivery)
                          </div>
                          <div className="text-xs text-[#666666] mt-0.5">
                            Pay with cash or UPI to the courier upon doorstep delivery.
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        Zero Extra Fee
                      </span>
                    </div>
                  </label>

                  {/* Option 2: Online Payment (Coming Soon placeholder) */}
                  <div className="p-4 rounded-2xl border border-dashed border-[#E5E7EB] bg-gray-50/70 opacity-70 select-none">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border border-gray-300 bg-gray-100" />
                        <div>
                          <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                            Online Payment (UPI, Credit/Debit Cards, NetBanking)
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            Gateway setup in progress. Please choose Cash on Delivery for instant dispatch.
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Placement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs sticky top-24 space-y-6">
                <h2 className="text-lg font-black uppercase tracking-tight text-[#111111] pb-3 border-b border-[#E5E7EB]">
                  Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                </h2>

                {/* Items List */}
                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-none">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-sky-50 shrink-0 border border-gray-200">
                        <Image
                          src={item.product.image || "/images/hero_podium.png"}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-0 right-0 bg-[#142B70] text-white text-[10px] font-black w-4 h-4 rounded-bl flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#111111] truncate">{item.product.title}</h4>
                        <p className="text-[11px] text-[#666666]">
                          ₹{item.product.price} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-xs font-black text-[#142B70]">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Input */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{appliedCoupon.code} Applied (-₹{appliedCoupon.discount})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-[11px] text-red-600 hover:underline font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon Code (e.g. PRO10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs uppercase font-bold outline-none focus:border-[#142B70]"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyCoupon()}
                          disabled={isApplyingCoupon || !couponInput.trim()}
                          className="px-4 py-2.5 rounded-xl bg-[#142B70] hover:bg-[#2445A8] text-white text-xs font-black uppercase tracking-wider disabled:opacity-50"
                        >
                          {isApplyingCoupon ? "..." : "Apply"}
                        </button>
                      </div>
                      {couponError && <p className="text-[11px] text-red-600 mt-1 font-semibold">{couponError}</p>}
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500">
                        <Tag className="w-3 h-3 text-[#2445A8]" />
                        <span>Try coupon: <strong className="text-[#142B70] cursor-pointer" onClick={() => setCouponInput("PRO10")}>PRO10</strong> (10% Off)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-3 border-t border-[#E5E7EB] text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span className={`font-bold ${shippingFee === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                      {shippingFee === 0 ? "FREE" : "₹70.00"}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount</span>
                      <span>-₹{appliedCoupon.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-[#111111] pt-3 border-t border-[#E5E7EB]">
                    <span>Total Amount</span>
                    <span className="text-[#142B70]">₹{finalTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right">Inclusive of all GST taxes</p>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#142B70] hover:bg-[#2445A8] text-white text-xs font-black uppercase tracking-[0.16em] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <span>Place Order (Cash on Delivery)</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Trust Strip */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-gray-500 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Dispatch in 24 Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Genuine Salon Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
