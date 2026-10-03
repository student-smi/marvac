import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = body.mode === "wipe" ? "wipe" : "seed";

    const updatedData = await store.resetStoreData(mode);

    return NextResponse.json({
      success: true,
      message:
        mode === "wipe"
          ? "All store data has been completely cleared."
          : "Fresh Aura Beauty dummy data has been successfully seeded!",
      data: updatedData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to reset store data" },
      { status: 500 }
    );
  }
}
