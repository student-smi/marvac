"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import AuraLogo from "@/components/AuraLogo";
import { Order } from "@/lib/store";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.order) {
          setOrder(data.order);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <AuraLogo />
          </Link>
          <Link
            href="/"
            className="text-xs font-bold text-[#2445A8] hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#142B70] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">
              Loading Order Details...
            </p>
          </div>
        ) : !order ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#E5E7EB] shadow-xs max-w-md mx-auto">
            <h2 className="text-xl font-black text-gray-900 uppercase">Order Not Found</h2>
            <p className="text-xs text-gray-600 mt-2 mb-6">
              We couldn&apos;t locate this order ID. It might still be processing.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-full bg-[#142B70] text-white text-xs font-bold uppercase tracking-wider"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Confirmation Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E7EB] shadow-xs text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-5 text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-[11px] font-black text-emerald-600 tracking-[0.2em] uppercase block mb-1">
                ORDER CONFIRMED
              </span>
              <h1 className="text-2xl sm:text-4xl font-black uppercase text-[#111111] tracking-tight">
                Thank You, {order.customer_name}!
              </h1>
              <p className="text-sm text-[#666666] mt-2 max-w-md mx-auto">
                Your order has been placed successfully. A confirmation email and SMS has been sent to{" "}
                <strong className="text-gray-900">{order.customer_email}</strong>.
              </p>

              {/* Order Number Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#EAF3FF] border border-[#2445A8]/20 mt-6">
                <span className="text-xs text-[#2445A8] font-bold uppercase tracking-wider">Order No:</span>
                <span className="text-sm sm:text-base font-black text-[#142B70] tracking-wider">
                  {order.order_number}
                </span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#2445A8] mb-6">
                Estimated Delivery Timeline
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Order Placed</span>
                  </div>
                  <p className="text-[11px] text-gray-600">Today, Just now</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EAF3FF] border border-[#2445A8]/20">
                  <div className="flex items-center gap-2 text-[#142B70] font-bold text-xs uppercase mb-1">
                    <Package className="w-4 h-4" />
                    <span>Packing & QC</span>
                  </div>
                  <p className="text-[11px] text-gray-600">Within 24 Hours</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase mb-1">
                    <Truck className="w-4 h-4" />
                    <span>Dispatched</span>
                  </div>
                  <p className="text-[11px] text-gray-500">Express Courier Air</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Doorstep Delivery</span>
                  </div>
                  <p className="text-[11px] text-gray-500">2-4 Business Days</p>
                </div>
              </div>
            </div>

            {/* Two Column Grid: Order Items & Delivery Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Order Items */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-4">
                <h3 className="text-sm font-black uppercase tracking-tight text-[#111111] pb-3 border-b border-[#E5E7EB]">
                  Purchased Items ({order.items.length})
                </h3>

                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-none">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-sky-50 shrink-0 border border-gray-200">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Quantity: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <div className="text-sm font-black text-[#142B70]">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-[#E5E7EB] text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600">
                      {order.shipping_fee === 0 ? "FREE" : `₹${order.shipping_fee.toFixed(2)}`}
                    </span>
                  </div>
                  {order.discount_amount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({order.coupon_code || "Applied"})</span>
                      <span>-₹{order.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-[#111111] pt-3 border-t border-[#E5E7EB]">
                    <span>Total Amount Paid/Due</span>
                    <span className="text-[#142B70]">₹{order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping & Payment Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-tight text-[#111111] pb-3 border-b border-[#E5E7EB]">
                    Delivery Address
                  </h3>

                  <div className="space-y-2 text-xs text-gray-700">
                    <p className="font-bold text-sm text-[#111111]">{order.customer_name}</p>
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-[#2445A8] shrink-0 mt-0.5" />
                      <span>
                        {order.shipping_address}, {order.city}, {order.state} - <strong>{order.pincode}</strong>
                      </span>
                    </div>
                    <p className="text-gray-600 pt-1">
                      <strong>Phone:</strong> {order.customer_phone}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-1">
                      Payment Mode
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">{order.payment_method}</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {order.payment_status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Support Assistance */}
                <div className="bg-[#EAF3FF] rounded-3xl p-6 border border-[#2445A8]/20 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-black uppercase text-[#142B70]">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <span>Need Help with Order?</span>
                  </div>
                  <p className="text-xs text-[#666666]">
                    Our salon specialists are on standby on WhatsApp to confirm delivery time or answer questions.
                  </p>
                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Aura Beauty%2C%20I%20have%20an%20inquiry%20regarding%20my%20Order%20${order.order_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
