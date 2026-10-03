import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const coupons = await store.getAllCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (error) {
    console.error("Fetch coupons error:", error);
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { code, discountType, discountValue, minOrderValue } = await req.json();

    if (!code || !discountValue) {
      return NextResponse.json({ error: "Code and discount value required" }, { status: 400 });
    }

    const newCoupon = await store.createCoupon({
      code: code.trim().toUpperCase(),
      discountType: discountType || "percentage",
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue || 0),
    });

    return NextResponse.json({ success: true, coupon: newCoupon });
  } catch (error) {
    console.error("Create coupon error:", error);
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { code, originalCode, ...updates } = body;
    const lookupCode = originalCode || code;

    if (!lookupCode) {
      return NextResponse.json({ error: "Coupon code required" }, { status: 400 });
    }

    if (updates.discountValue !== undefined) updates.discountValue = Number(updates.discountValue);
    if (updates.minOrderValue !== undefined) updates.minOrderValue = Number(updates.minOrderValue);
    if (code) updates.code = code.trim().toUpperCase();

    const updated = await store.updateCoupon(lookupCode, updates);
    return NextResponse.json({ success: true, coupon: updated });
  } catch (error) {
    console.error("Update coupon error:", error);
    return NextResponse.json({ error: "Failed to update coupon" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Coupon code required" }, { status: 400 });
    }

    const deleted = await store.deleteCoupon(code);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("Delete coupon error:", error);
    return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 });
  }
}

