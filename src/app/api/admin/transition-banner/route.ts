import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const banner = await store.getTransitionBanner();
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transition banner settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await store.updateTransitionBanner(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update transition banner settings' }, { status: 500 });
  }
}
