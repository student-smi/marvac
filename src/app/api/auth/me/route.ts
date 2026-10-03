import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("aura_token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const user = await store.findUserById(payload.userId);
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const orders = await store.getOrdersByUser(user.id);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
      },
      orders,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
