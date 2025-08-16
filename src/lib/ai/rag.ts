// import type { NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
// import matter from 'gray-matter';
import fsExtra from 'fs/promises';

// This module provides a simple Retrieval‑Augmented Generation (RAG) helper.
// In a production environment you would generate embeddings via OpenAI’s
// embedding API (e.g. text‑embedding‑3‑small) and store them in a vector
// database. At query time the most relevant documents would be fetched
// and passed into the chat completion call. For this MVP, we stub the
// behaviour by returning a canned response and citing related case slugs.

/**
 * Find related cases based on the category provided by the user. We match
 * categories to our content slugs.
 */
async function getRelatedSlugs(category: string): Promise<string[]> {
  const resultsJsonPath = path.join(process.cwd(), 'content', 'results.json');
  const data = JSON.parse(await fs.readFile(resultsJsonPath, 'utf8')) as Array<{ slug: string; type: string }>;
  return data
    .filter((item) => item.type.toLowerCase().includes(category.toLowerCase()))
    .map((item) => item.slug);
}

/**
 * Generate a mock response. In the absence of an OpenAI API key this
 * function returns a simple template filled with example content. If
 * OPENAI_API_KEY is defined in the environment, you could replace this
 * with a call to the OpenAI API.
 */
export async function generateResponse(goal: string, category: string) {
  const related = await getRelatedSlugs(category);
  
  try {
    const cfgRaw = await fsExtra.readFile(
      path.join(process.cwd(), 'content', 'ask-config.json'),
      'utf8'
    );
    const cfg = JSON.parse(cfgRaw) as { 
      systemInstructions: string; 
      hiddenKnowledge: string[];
      apiKeys: { openai: string };
    };
    
    // If OpenAI key is configured, use GPT-4o-mini
    if (cfg.apiKeys.openai) {
      // Use dynamic import instead of require()
      const OpenAI = await import('openai').then(m => m.default);
      const openai = new OpenAI({ apiKey: cfg.apiKeys.openai });
      
      const prompt = `System: ${cfg.systemInstructions}\n\nHidden Knowledge:\n${cfg.hiddenKnowledge.join('\n')}\n\nUser Question: ${goal}\nCategory: ${category}\n\nPlease provide a structured response with: Goal Recap, Leadership Plan, Hands-On Steps, Risks & Mitigations, and 90-Day Roadmap. Base your answer only on the provided knowledge and website content.`;
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      });
      
      const aiResponse = completion.choices[0]?.message?.content || '';
      
      // Parse AI response and return structured format
      return {
        goalRecap: `You want to ${goal}.`,
        leadershipPlan: aiResponse,
        handsOnSteps: `Based on AI analysis: ${aiResponse}`,
        risks: `AI identified risks: ${aiResponse}`,
        roadmap: `AI roadmap: ${aiResponse}`,
        cites: related,
      };
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
  }
  
  // Fallback to existing logic if OpenAI fails
  return {
    goalRecap: `You want to ${goal}.`,
    leadershipPlan: `Define a strategy to achieve ${goal}, involving clear OKRs and stakeholder alignment.`,
    handsOnSteps: `1. Audit current performance. 2. Run experiments targeting improvement areas. 3. Measure and iterate.`,
    risks: `Market volatility and resource constraints could impede progress. Mitigate by setting contingency plans.`,
    roadmap: `Month 1: discovery and planning. Month 2: experiment and iterate. Month 3: scale successful tactics.`,
    cites: related,
  };
}