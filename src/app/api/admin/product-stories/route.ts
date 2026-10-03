import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const productStories = await store.getAllProductStories();
    return NextResponse.json({ success: true, productStories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch product stories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { badge, title, subtitle, description, quote, quoteAuthor, benefits, image, floatingBadgeTitle, floatingBadgeDesc, ctaText, ctaLink } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Story Title and Description are required" }, { status: 400 });
    }

    const newStory = await store.createProductStory({
      badge: badge || "PREMIUM FORMULATION",
      title,
      subtitle: subtitle || title,
      description,
      quote: quote || description,
      quoteAuthor: quoteAuthor || "Aura Clinical Team",
      benefits: Array.isArray(benefits) ? benefits : (benefits || "").split(",").map((b: string) => b.trim()).filter(Boolean),
      image: image || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
      floatingBadgeTitle: floatingBadgeTitle || "Clinical Performance",
      floatingBadgeDesc: floatingBadgeDesc || "Engineered for 24-hour style hold.",
      ctaText: ctaText || "LEARN MORE",
      ctaLink: ctaLink || "/category/facial-serums-elixirs",
    });

    return NextResponse.json({ success: true, story: newStory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create product story" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Story ID required" }, { status: 400 });
    }

    const updated = await store.updateProductStory(id, updates);
    return NextResponse.json({ success: true, story: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update product story" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Story ID required" }, { status: 400 });
    }

    const success = await store.deleteProductStory(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete product story" }, { status: 500 });
  }
}
