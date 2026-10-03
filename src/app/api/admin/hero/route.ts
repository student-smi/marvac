import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const heroCampaigns = await store.getAllHeroCampaigns();
    return NextResponse.json({ success: true, heroCampaigns });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch hero slides" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eyebrow, title1, title2, description, bullets, price, originalPrice, image, ctaText, ctaLink } = body;

    if (!title1 || !title2) {
      return NextResponse.json({ error: "Headline titles are required" }, { status: 400 });
    }

    const newSlide = await store.createHeroCampaign({
      eyebrow: eyebrow || "AURA EXCLUSIVE",
      title1,
      title2,
      description: description || "Formulated to deliver all-day finish and unshakeable radiance.",
      bullets: Array.isArray(bullets) ? bullets : (bullets || "").split(",").map((b: string) => b.trim()).filter(Boolean),
      price: Number(price || 999),
      originalPrice: Number(originalPrice || 1499),
      image: image || "/images/hero_podium.png",
      ctaText: ctaText || "SHOP NOW",
      ctaLink: ctaLink || "/category/hair-styling-hold",
    });

    return NextResponse.json({ success: true, slide: newSlide });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create hero slide" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 });
    }

    if (updates.bullets && typeof updates.bullets === "string") {
      updates.bullets = updates.bullets.split(",").map((b: string) => b.trim()).filter(Boolean);
    }
    if (updates.price) updates.price = Number(updates.price);
    if (updates.originalPrice) updates.originalPrice = Number(updates.originalPrice);

    const updated = await store.updateHeroCampaign(id, updates);
    return NextResponse.json({ success: true, slide: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update hero slide" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 });
    }

    const deleted = await store.deleteHeroCampaign(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete hero slide" }, { status: 500 });
  }
}
