import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const stats = await store.getStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
