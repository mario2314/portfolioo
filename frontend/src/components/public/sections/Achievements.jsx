import { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

export default function Achievements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/achievements', { params: { limit: 50 } }).then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <section id="achievements" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Recognition" title="Achievements" />

        {!loading && items.length === 0 && <EmptyState message="Belum ada data." />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
              {item.imageUrl && <img src={item.imageUrl} alt={item.name} loading="lazy" className="w-full aspect-video object-cover rounded-lg mb-3" />}
              <p className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</p>
              {item.category && <p className="text-xs text-blue-600 dark:text-blue-400">{item.category}</p>}
              {item.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
