import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const storyReels = await store.getAllStoryReels();
    return NextResponse.json({ success: true, storyReels });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch stories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, tag, views, image, productName, productPrice, productOriginalPrice, handle, author, authorRole, avatar } = body;

    if (!title) {
      return NextResponse.json({ error: "Story Title is required" }, { status: 400 });
    }

    const newReel = await store.createStoryReel({
      title,
      author: author || "Aura Stylist",
      authorRole: authorRole || "Salon Expert",
      avatar: avatar || "https://images.unsplash.com/photo-1594824813571-24a69c100417?auto=format&fit=crop&w=300&q=80",
      coverImage: image || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      image: image || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      tag: tag || "Salon Story",
      views: views || "1.5K views",
      handle: handle || "aura-24k-gold-saffron-radiance-elixir",
      taggedProductId: "aura-prod-1",
      taggedProductTitle: productName || "Aura Formulation",
      productName: productName || "Aura Formulation",
      taggedProductPrice: Number(productPrice || 999),
      productPrice: Number(productPrice || 999),
      productOriginalPrice: Number(productOriginalPrice || 1499),
      taggedProductImage: image || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    });

    return NextResponse.json({ success: true, reel: newReel });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create story reel" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Story ID required" }, { status: 400 });
    }

    const success = await store.deleteStoryReel(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete story reel" }, { status: 500 });
  }
}
