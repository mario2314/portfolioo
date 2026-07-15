import { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

function formatDate(d) {
  if (!d) return 'Sekarang';
  return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' });
}

export default function Experience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/experience').then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Where I've worked" title="Experience" />

        {!loading && items.length === 0 && <EmptyState message="Belum ada data." />}

        <div className="space-y-6">
          {items.map((exp) => (
            <div key={exp.id} className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              {exp.logoUrl && <img src={exp.logoUrl} alt={exp.company} loading="lazy" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                  <span className="text-xs text-gray-400">{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                {exp.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-wrap">{exp.description}</p>}
                {exp.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.skills.map((s) => (
                      <span key={s.id} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
