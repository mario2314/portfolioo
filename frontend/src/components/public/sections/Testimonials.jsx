import { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/testimonials', { params: { limit: 20 } }).then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Kind words" title="Testimonials" />

        {!loading && items.length === 0 && <EmptyState message="Belum ada testimoni." />}

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((t) => (
            <div key={t.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} size={14} className={i < t.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3 mt-4">
                {t.photoUrl && <img src={t.photoUrl} alt={t.name} loading="lazy" className="w-9 h-9 rounded-full object-cover" />}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                  {(t.position || t.company) && (
                    <p className="text-xs text-gray-400">{[t.position, t.company].filter(Boolean).join(' · ')}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
