import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

async function cfgPath() {
  return path.join(process.cwd(), 'content', 'ask-config.json');
}

export async function GET() {
  const p = await cfgPath();
  const raw = await fs.readFile(p, 'utf8');
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const p = await cfgPath();
  await fs.writeFile(p, JSON.stringify(body, null, 2), 'utf8');
  return NextResponse.json({ ok: true });
}


