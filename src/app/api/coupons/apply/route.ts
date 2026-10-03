import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const { code, cartTotal } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: "Coupon code is required" }, { status: 400 });
    }

    const result = await store.validateCoupon(code, cartTotal || 0);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Coupon error:", error);
    return NextResponse.json({ valid: false, message: "Failed to validate coupon" }, { status: 500 });
  }
}
