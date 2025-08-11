import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Params {
  slug: string;
}

// Pre‑build paths for all case studies
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'cases');
  const files = await fs.readdir(dir);
  return files.map((file) => ({ slug: file.replace(/\.mdx$/, '') }));
}

export default async function CasePage({ params }: { params: Params }) {
  const { slug } = params;
  const mdxPath = path.join(process.cwd(), 'content', 'cases', `${slug}.mdx`);
  try {
    const source = await fs.readFile(mdxPath, 'utf8');
    const { content, data } = matter(source);
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        {/* Sidebar showing key takeaways */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="prose dark:prose-invert flex-1">
            <MDXRemote source={content} />
          </div>
          <aside className="w-full lg:w-64 p-4 rounded-xl bg-sand dark:bg-gray-800 text-sm space-y-4">
            <h2 className="font-semibold">Summary</h2>
            <p>This case study details the challenge, approach and outcome of {data.title}.</p>
            {data.relatedResult && (
              <p>
                Related result: <a href={`/case/${data.relatedResult}`}>{data.relatedResult}</a>
              </p>
            )}
          </aside>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="py-16 text-center text-red-600">
        <p>Case study not found.</p>
      </div>
    );
  }
}