import { NextRequest, NextResponse } from 'next/server';
import { generateResponse } from '@/lib/ai/rag';

export async function POST(request: NextRequest) {
  try {
    const { goal, category } = await request.json();
    if (!goal || !category) {
      return NextResponse.json({ error: 'Missing goal or category' }, { status: 400 });
    }
    // Rate limiting would be implemented here in production
    const data = await generateResponse(goal, category);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}