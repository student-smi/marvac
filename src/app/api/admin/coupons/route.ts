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
