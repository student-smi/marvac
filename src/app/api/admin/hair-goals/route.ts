import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const goals = await store.getAllHairGoals();
    return NextResponse.json(goals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hair goals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await store.createHairGoal(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create hair goal' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
    }
    const updated = await store.updateHairGoal(id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Hair goal not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hair goal' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
    }
    const success = await store.deleteHairGoal(id);
    if (!success) {
      return NextResponse.json({ error: 'Hair goal not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete hair goal' }, { status: 500 });
  }
}
