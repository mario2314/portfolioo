import { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

function formatDate(d) {
  if (!d) return 'Sekarang';
  return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' });
}

export default function Education() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/education').then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="My background" title="Education" />

        {!loading && items.length === 0 && <EmptyState message="Belum ada data." />}

        <div className="space-y-6">
          {items.map((edu) => (
            <div key={edu.id} className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              {edu.logoUrl && <img src={edu.logoUrl} alt={edu.school} loading="lazy" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{edu.school}</h3>
                  <span className="text-xs text-gray-400">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</span>
                </div>
                {edu.major && <p className="text-sm text-blue-600 dark:text-blue-400">{edu.major}{edu.gpa ? ` · IPK ${edu.gpa}` : ''}</p>}
                {edu.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
