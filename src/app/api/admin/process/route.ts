import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const processSteps = await store.getProcessSteps();
    return NextResponse.json({ success: true, processSteps });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch process steps" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { step, title, category, productName, tagline, description, benefits, howToUse, result, image, badge } = body;

    if (!title || !productName) {
      return NextResponse.json({ error: "Title and Product Name are required" }, { status: 400 });
    }

    const newStep = await store.createProcessStep({
      step: step || "04",
      title,
      category: category || "STYLING PHASE",
      productName,
      tagline: tagline || "",
      description: description || "",
      benefits: Array.isArray(benefits) ? benefits : (benefits || "").split(",").map((b: string) => b.trim()).filter(Boolean),
      howToUse: howToUse || "",
      result: result || "",
      image: image || "/images/process_01_volumizer.png",
      badge: badge || `STEP ${step || "04"}`,
    });

    return NextResponse.json({ success: true, step: newStep });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create process step" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { index, ...updates } = body;

    if (index === undefined) {
      return NextResponse.json({ error: "Step index required" }, { status: 400 });
    }

    if (updates.benefits && typeof updates.benefits === "string") {
      updates.benefits = updates.benefits.split(",").map((b: string) => b.trim()).filter(Boolean);
    }

    const updated = await store.updateProcessStep(Number(index), updates);
    return NextResponse.json({ success: true, step: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update process step" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const index = searchParams.get("index");

    if (index === null) {
      return NextResponse.json({ error: "Step index required" }, { status: 400 });
    }

    const deleted = await store.deleteProcessStep(Number(index));
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete process step" }, { status: 500 });
  }
}
