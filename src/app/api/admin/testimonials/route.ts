import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const testimonials = await store.getAllTestimonials();
    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, salon, city, rating, review, comment, verified, avatar, location } = body;

    if (!name || (!review && !comment)) {
      return NextResponse.json({ error: "Reviewer name and review text are required" }, { status: 400 });
    }

    const text = review || comment;

    const newTestimonial = await store.createTestimonial({
      name,
      role: role || "Verified Stylist",
      salon: salon || "Beauty Studio",
      city: city || location || "India",
      location: location || city || "India",
      comment: text,
      review: text,
      rating: Number(rating || 5),
      verified: verified !== undefined ? !!verified : true,
      avatar: avatar || "https://images.unsplash.com/photo-1594824813571-24a69c100417?auto=format&fit=crop&w=300&q=80",
    });

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID required" }, { status: 400 });
    }

    if (updates.rating !== undefined) updates.rating = Number(updates.rating);
    if (updates.review) updates.comment = updates.review;
    if (updates.comment) updates.review = updates.comment;

    const updated = await store.updateTestimonial(id, updates);
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID required" }, { status: 400 });
    }

    const success = await store.deleteTestimonial(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete testimonial" }, { status: 500 });
  }
}
