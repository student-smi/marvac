import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const kits = await store.getAllKits();
    return NextResponse.json(kits);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch kits' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await store.createKit(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create kit' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: 'Kit ID is required' }, { status: 400 });
    }
    const updated = await store.updateKit(id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Kit not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update kit' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Kit ID is required' }, { status: 400 });
    }
    const success = await store.deleteKit(id);
    if (!success) {
      return NextResponse.json({ error: 'Kit not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete kit' }, { status: 500 });
  }
}
