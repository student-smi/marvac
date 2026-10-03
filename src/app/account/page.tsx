"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  LogOut,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  ExternalLink,
} from "lucide-react";
import AuraLogo from "@/components/AuraLogo";
import { Order } from "@/lib/store";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
          setOrders(data.orders || []);
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#142B70] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <AuraLogo />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-[#142B70] hover:underline uppercase tracking-wider"
            >
              Back to Store
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EAF3FF] border border-[#2445A8]/20 flex items-center justify-center text-[#142B70] font-black text-2xl">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block">
                AURA BEAUTY MEMBER
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#111111]">
                {user?.name}
              </h1>
              <p className="text-xs text-[#666666] mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/checkout"
              className="px-5 py-2.5 rounded-full bg-[#142B70] hover:bg-[#2445A8] text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all"
            >
              Go to Cart / Checkout →
            </Link>
          </div>
        </div>

        {/* Orders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase text-[#111111] tracking-tight flex items-center gap-2">
              <Package className="w-5 h-5 text-[#2445A8]" />
              Your Order History ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-[#E5E7EB] shadow-xs max-w-md mx-auto">
              <Package className="w-14 h-14 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-black uppercase text-gray-900">No Orders Placed Yet</h3>
              <p className="text-xs text-gray-500 mt-1 mb-6">
                Your past purchases and deliveries will appear here once placed.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-full bg-[#142B70] text-white text-xs font-black uppercase tracking-wider"
              >
                Browse Catalog →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                        Order Number
                      </span>
                      <span className="text-base font-black text-[#142B70]">{ord.order_number}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        {ord.order_status}
                      </span>
                      <Link
                        href={`/order-success/${ord.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#2445A8] hover:underline uppercase"
                      >
                        <span>View Invoice</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ord.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/70 border border-gray-100"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white relative overflow-hidden shrink-0 border border-gray-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-gray-900 truncate">{item.title}</p>
                          <p className="text-[11px] text-gray-500">
                            Qty: {item.quantity} • ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Placed on {new Date(ord.created_at).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total: </span>
                      <strong className="text-sm font-black text-[#142B70]">
                        ₹{ord.total_amount.toFixed(2)}
                      </strong>{" "}
                      <span className="text-[10px] text-gray-400">({ord.payment_method})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
