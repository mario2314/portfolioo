import { useState, useEffect, useCallback } from 'react';
import { FiTrash2, FiMail } from 'react-icons/fi';
import { HiOutlineMailOpen } from 'react-icons/hi';
import api from '../../services/api';

export default function MessagesAdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('all'); // all | unread | read

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (filter === 'unread') params.isRead = 'false';
      if (filter === 'read') params.isRead = 'true';
      const res = await api.get('/contact', { params });
      setData(res.data.data);
      setTotalPages(res.data.meta?.totalPages || 1);
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const markRead = async (id) => {
    await api.patch(`/contact/${id}/read`);
    fetchData();
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus pesan ini?')) return;
    await api.delete(`/contact/${id}`);
    fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 dark:text-white text-lg">Pesan Masuk</h2>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-1.5"
        >
          <option value="all">Semua</option>
          <option value="unread">Belum dibaca</option>
          <option value="read">Sudah dibaca</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        {loading && <p className="p-6 text-center text-gray-400">Memuat...</p>}
        {!loading && data.length === 0 && <p className="p-6 text-center text-gray-400">Belum ada pesan masuk.</p>}
        {!loading && data.map((msg) => (
          <div key={msg.id} className="p-4 flex items-start gap-3">
            <div className="mt-0.5 text-gray-400">
              {msg.isRead ? <HiOutlineMailOpen size={16} /> : <FiMail size={16} className="text-blue-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{msg.name}</p>
                <span className="text-xs text-gray-400">{msg.email}</span>
                {!msg.isRead && <span className="text-[10px] uppercase bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Baru</span>}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">{msg.message}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleString('id-ID')}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {!msg.isRead && (
                <button onClick={() => markRead(msg.id)} className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Tandai dibaca
                </button>
              )}
              <button onClick={() => remove(msg.id)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
                <FiTrash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end gap-2 text-sm text-gray-500">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 border rounded disabled:opacity-40">Sebelumnya</button>
          <span>Halaman {page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded disabled:opacity-40">Selanjutnya</button>
        </div>
      )}
    </div>
  );
}
