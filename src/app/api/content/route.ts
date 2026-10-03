import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const data = await store.getLandingPageData();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Fetch content error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load landing content" },
      { status: 500 }
    );
  }
}
