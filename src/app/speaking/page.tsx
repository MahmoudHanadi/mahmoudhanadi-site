import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

async function getSpeakingEntries() {
  const dir = path.join(process.cwd(), 'content', 'speaking');
  const files = await fs.readdir(dir);
  const entries = await Promise.all(
    files.map(async (file) => {
      const mdxPath = path.join(dir, file);
      const source = await fs.readFile(mdxPath, 'utf8');
      const { content, data } = matter(source);
      return { slug: file.replace(/\.mdx$/, ''), frontmatter: data as any, content };
    }),
  );
  return entries;
}

export default async function SpeakingPage() {
  const entries = await getSpeakingEntries();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Speaking</h1>
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.slug} className="p-6 rounded-xl bg-sand dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-1">{entry.frontmatter.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
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