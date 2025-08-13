import { NextRequest, NextResponse } from 'next/server';
import { generateResponse } from '@/lib/ai/rag';
import fs from 'fs/promises';
import path from 'path';

async function loadConfig() {
  const file = path.join(process.cwd(), 'content', 'ask-config.json');
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw) as {
    systemInstructions: string;
    hiddenKnowledge: string[];
    blockedPhrases: string[];
    apiKeys: { openai: string };
  };
}

export async function POST(request: NextRequest) {
  try {
    const { goal, category, user } = await request.json();
    if (!goal || !category || !user?.name || !user?.email) {
      return NextResponse.json({ error: 'Missing goal or category' }, { status: 400 });
    }
    // Load admin-configured instructions and filters
    const cfg = await loadConfig();
    // Blocked phrase check
    const lowered = (goal as string).toLowerCase();
    if (cfg.blockedPhrases.some((p) => lowered.includes(p.toLowerCase()))) {
      return NextResponse.json({ success: true, data: { goalRecap: goal, leadershipPlan: 'This topic is restricted.', handsOnSteps: '', risks: '', roadmap: '', cites: [] } });
    }

    // Generate response constrained to site knowledge (rag.ts respects this)
    const data = await generateResponse(goal, category);

    // Naive logging of question for now (file-based). In production use DB.
    const logLine = JSON.stringify({ ts: new Date().toISOString(), user, goal, category }) + '\n';
    await fs.appendFile(path.join(process.cwd(), 'content', 'ask-log.ndjson'), logLine, 'utf8');

    return NextResponse.json({ success: true, data, meta: { usedSystem: cfg.systemInstructions } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}