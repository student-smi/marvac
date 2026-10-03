import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const categories = await store.getAllCategories();
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, title, itemCount, image, link } = body;

    if (!name && !title) {
      return NextResponse.json({ error: "Category name or title is required" }, { status: 400 });
    }

    const catName = name || title;
    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newCategory = await store.createCategory({
      name: catName,
      title: catName,
      itemCount: Number(itemCount || 0),
      image: image || "/images/cat_products.png",
      link: link || `/category/${slug}`,
    });

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create category" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    if (updates.name && !updates.title) updates.title = updates.name;
    if (updates.title && !updates.name) updates.name = updates.title;
    if (updates.itemCount) updates.itemCount = Number(updates.itemCount);

    const updated = await store.updateCategory(id, updates);
    return NextResponse.json({ success: true, category: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const deleted = await store.deleteCategory(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete category" }, { status: 500 });
  }
}
