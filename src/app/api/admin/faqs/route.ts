import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const faqs = await store.getAllFaqs();
    return NextResponse.json({ success: true, faqs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch faqs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    const newFaq = await store.createFaq({
      question,
      answer,
    });

    return NextResponse.json({ success: true, faq: newFaq });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });
    }

    const deleted = await store.deleteFaq(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete FAQ" }, { status: 500 });
  }
}
