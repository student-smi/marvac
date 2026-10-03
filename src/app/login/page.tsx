"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import AuraLogo from "@/components/AuraLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/account");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-6">
          <AuraLogo />
        </Link>
        <span className="text-[11px] font-black text-[#2445A8] tracking-[0.16em] uppercase block mb-1">
          SALON PROFESSIONAL PORTAL
        </span>
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#111111] tracking-tight">
          Log In to Your Account
        </h2>
        <p className="mt-2 text-xs text-[#666666]">
          Or{" "}
          <Link href="/register" className="font-bold text-[#2445A8] hover:underline">
            create a new account for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E5E7EB] shadow-xs space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="e.g. artist@salon.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E7EB] focus:border-[#142B70] focus:ring-1 focus:ring-[#142B70] text-sm outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#142B70] hover:bg-[#2445A8] text-white text-xs font-black uppercase tracking-[0.16em] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span>Logging In...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
