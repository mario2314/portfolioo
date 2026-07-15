import { useEffect, useState } from 'react';
import { FiBriefcase, FiCode, FiFileText, FiMail } from 'react-icons/fi';
import api from '../../services/api';

const statCards = [
  { key: 'projects', label: 'Projects', icon: FiBriefcase, endpoint: '/projects/admin/all' },
  { key: 'skills', label: 'Skills', icon: FiCode, endpoint: '/skills' },
  { key: 'blog', label: 'Artikel Blog', icon: FiFileText, endpoint: '/blog/admin/all' },
  { key: 'unreadMessages', label: 'Pesan Belum Dibaca', icon: FiMail, endpoint: '/contact', params: { isRead: 'false' } },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all(
      statCards.map((c) =>
        api.get(c.endpoint, { params: { limit: 1, ...(c.params || {}) } }).then((res) => [c.key, res.data.meta?.total ?? res.data.data.length])
      )
    ).then((results) => {
      if (mounted) {
        setStats(Object.fromEntries(results));
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-sm text-gray-500">Ringkasan konten portfolio kamu.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ key, label, icon: Icon }) => (
          <div key={key} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <Icon className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {loading ? '–' : stats[key] ?? 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
