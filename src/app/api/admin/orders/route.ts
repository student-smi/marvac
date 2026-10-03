import { NextResponse } from "next/server";
import { store, Order } from "@/lib/store";

export async function GET() {
  try {
    const orders = await store.getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "Order ID and status required" }, { status: 400 });
    }

    const updated = await store.updateOrderStatus(orderId, status as Order["order_status"]);
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Update order status error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    const deleted = await store.deleteOrder(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("Delete order error:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}

