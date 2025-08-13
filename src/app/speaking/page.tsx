import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface SpeakingFrontmatter {
  title: string;
  eventDate: string;
  location: string;
}

async function getSpeakingEntries(): Promise<Array<{ slug: string; frontmatter: SpeakingFrontmatter; content: string }>> {
  const dir = path.join(process.cwd(), 'content', 'speaking');
  const files = await fs.readdir(dir);
  const entries = await Promise.all(
    files.map(async (file) => {
      const mdxPath = path.join(dir, file);
      const source = await fs.readFile(mdxPath, 'utf8');
      const { content, data } = matter(source);
      const frontmatter = data as SpeakingFrontmatter;
      return { slug: file.replace(/\.mdx$/, ''), frontmatter, content };
    }),
  );
  return entries;
}

export default async function SpeakingPage() {
  const entries = await getSpeakingEntries();
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Speaking &amp; Events</h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
        Occasions where I’ve shared insights on growth, media buying and GTM at
        conferences and forums. More to come soon!
      </p>
      <div className="space-y-6">
        {entries.map((entry) => (
          <div
            key={entry.slug}
            className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-1 text-olive dark:text-olive">
              {entry.frontmatter.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {entry.frontmatter.eventDate} · {entry.frontmatter.location}
            </p>
            <div className="prose dark:prose-invert">
              <MDXRemote source={entry.content} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}