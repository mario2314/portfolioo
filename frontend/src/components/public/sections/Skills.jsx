import { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

const categoryLabels = {
  PROGRAMMING_LANGUAGE: 'Programming Language',
  FRAMEWORK: 'Framework',
  DATABASE: 'Database',
  CLOUD: 'Cloud',
  TOOLS: 'Tools',
  AI: 'AI',
  ROBOTICS: 'Robotics',
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/skills', { params: { limit: 100 } })
      .then((res) => setSkills(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="What I work with" title="Skills & Tech Stack" />

        {!loading && skills.length === 0 && <EmptyState message="Belum ada data." />}

        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                {categoryLabels[category] || category}
              </p>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
                  >
                    {skill.iconUrl && <img src={skill.iconUrl} alt={skill.name} className="w-4 h-4" />}
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
