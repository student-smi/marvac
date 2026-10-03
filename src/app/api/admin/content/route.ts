import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const data = await store.getLandingPageData();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, brandSettings, announcementItems, newAnnouncementItem, deleteAnnouncementId, processSteps } = body;

    if (action === "updateBrandSettings" && brandSettings) {
      const updated = await store.updateBrandSettings(brandSettings);
      return NextResponse.json({ success: true, brandSettings: updated });
    }

    if (action === "updateAnnouncementItems" && announcementItems) {
      const updated = await store.updateAnnouncementItems(announcementItems);
      return NextResponse.json({ success: true, announcementItems: updated });
    }

    if (action === "addAnnouncementItem" && newAnnouncementItem) {
      const added = await store.addAnnouncementItem(newAnnouncementItem);
      return NextResponse.json({ success: true, announcementItem: added });
    }

    if (action === "deleteAnnouncementItem" && deleteAnnouncementId) {
      const deleted = await store.deleteAnnouncementItem(deleteAnnouncementId);
      return NextResponse.json({ success: deleted });
    }

    if (action === "updateProcessSteps" && processSteps) {
      const updated = await store.updateProcessSteps(processSteps);
      return NextResponse.json({ success: true, processSteps: updated });
    }

    return NextResponse.json({ error: "Invalid action or payload" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update content" }, { status: 500 });
  }
}
