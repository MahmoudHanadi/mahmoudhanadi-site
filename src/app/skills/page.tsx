import skills from '../../../content/skills.json';

interface Skill {
  name: string;
  examples: string[];
}

export default function SkillsPage() {
  const data: Skill[] = skills as any;
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Skills & Expertise</h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
        A snapshot of the areas where I drive measurable impact. Each pillar is supported
        by concrete examples of how I’ve applied the skill in past projects.
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none">
        {data.map((skill) => (
          <li
            key={skill.name}
            className="p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-olive dark:text-olive">
              {skill.name}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {skill.examples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}