import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { store } from "@/lib/store";
import { verifySessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      state,
      pincode,
      items,
      subtotal,
      shippingFee,
      discountAmount,
      couponCode,
      totalAmount,
      paymentMethod,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !pincode || !items?.length) {
      return NextResponse.json(
        { error: "Please fill in all required shipping and contact details" },
        { status: 400 }
      );
    }

    // Check if user is logged in
    const cookieStore = await cookies();
    const token = cookieStore.get("aura_token")?.value;
    let userId: string | undefined = undefined;

    if (token) {
      const session = await verifySessionToken(token);
      if (session) {
        userId = session.userId;
      }
    }

    // Create Order
    const order = await store.createOrder({
      user_id: userId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      shipping_address: shippingAddress,
      city: city || "Mumbai",
      state: state || "Maharashtra",
      pincode: pincode,
      items: items.map((item: any) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image || item.product.featured_image || "/images/hero_podium.png",
      })),
      subtotal: Number(subtotal),
      shipping_fee: Number(shippingFee),
      discount_amount: Number(discountAmount || 0),
      coupon_code: couponCode || undefined,
      total_amount: Number(totalAmount),
      payment_method: paymentMethod || "Cash on Delivery (COD)",
      payment_status: "pending",
      order_status: "confirmed",
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
