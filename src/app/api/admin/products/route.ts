import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const products = await store.getAllProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, price, originalPrice, category, image, description, hairGoals, isBestseller, badge } = body;

    if (!title || !price) {
      return NextResponse.json({ error: "Product title and price are required" }, { status: 400 });
    }

    const handle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProduct = await store.createProduct({
      title,
      handle,
      price: Number(price),
      originalPrice: Number(originalPrice || price),
      discountPercent: originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      category: category || "Skin & Hair",
      image: image || "/images/hero_podium.png",
      description: description || "Clinical formulation engineered for high performance.",
      rating: 5.0,
      reviewsCount: 1,
      badge: badge || "NEW",
      hairGoals: hairGoals || ["HOLD MY STYLE"],
      isBestseller: !!isBestseller,
      isHotThisWeek: true,
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const deleted = await store.deleteProduct(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
