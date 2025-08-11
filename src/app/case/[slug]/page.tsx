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
      <div className="space-y-8 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-olive dark:text-olive">
          {data.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This case details the challenge, approach and outcome of this project. Client names are anonymized.
        </p>
        {/* Content & summary layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main MDX content */}
          <div className="prose dark:prose-invert flex-1 max-w-none">
            <MDXRemote source={content} />
          </div>
          {/* Sticky sidebar with summary */}
          <aside className="w-full lg:w-72 h-fit lg:sticky lg:top-28 p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-800 text-sm space-y-4">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Key Points</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Challenge → Approach → Outcome
            </p>
            {data.relatedResult && (
              <p className="text-gray-700 dark:text-gray-300">
                Related result:{' '}
                <a
                  href={`/case/${data.relatedResult}`}
                  className="text-keffiyeh-red hover:underline"
                >
                  {data.relatedResult}
                </a>
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