import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    // Here you would integrate with an email provider (SMTP/Resend).
    // For the MVP we simply return success.
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}