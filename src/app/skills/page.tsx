import skills from '../../../content/skills.json';

interface Skill {
  name: string;
  examples: string[];
}

export default function SkillsPage() {
  const data: Skill[] = skills as any;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Skills</h1>
      <ul className="space-y-4">
        {data.map((skill) => (
          <li key={skill.name} className="p-4 rounded-xl bg-sand dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2">{skill.name}</h2>
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