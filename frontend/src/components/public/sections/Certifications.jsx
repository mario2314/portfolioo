import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

export default function Certifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/certifications', { params: { limit: 50 } }).then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <section id="certifications" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Credentials" title="Certifications" />

        {!loading && items.length === 0 && <EmptyState message="Belum ada data." />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((cert) => (
            <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex gap-3">
              {cert.imageUrl && <img src={cert.imageUrl} alt={cert.name} loading="lazy" className="w-12 h-12 rounded object-cover shrink-0" />}
              <div className="min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white">{cert.name}</p>
                {cert.issuer && <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer}</p>}
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                    Lihat credential <FiExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
