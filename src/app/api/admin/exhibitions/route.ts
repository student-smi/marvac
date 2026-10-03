import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const exhibitions = await store.getAllExhibitions();
    return NextResponse.json({ success: true, exhibitions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch exhibitions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, location, tag, attendees, image } = body;

    if (!title || !location) {
      return NextResponse.json({ error: "Exhibition Title and Location are required" }, { status: 400 });
    }

    const newEx = await store.createExhibition({
      title,
      location,
      tag: tag || "Expo Showcase",
      attendees: attendees || "5,000+ Visitors",
      image: image || "/images/exhibition_1.jpg",
    });

    return NextResponse.json({ success: true, exhibition: newEx });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create exhibition" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Exhibition ID is required" }, { status: 400 });
    }

    const deleted = await store.deleteExhibition(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete exhibition" }, { status: 500 });
  }
}
