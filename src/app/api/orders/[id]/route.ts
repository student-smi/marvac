import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await store.getOrderById(id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Fetch order error:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
