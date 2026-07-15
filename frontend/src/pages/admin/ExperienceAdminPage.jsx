import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiPlus, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import api from '../../services/api';
import FileUpload from '../../components/admin/FileUpload';

export default function ExperienceAdminPage() {
  const [items, setItems] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/experience');
      setItems(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);
  useEffect(() => {
    api.get('/skills', { params: { limit: 100 } }).then((res) => setSkills(res.data.data));
  }, []);

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setModalOpen(true); };

  const handleDelete = async (item) => {
    if (!window.confirm(`Hapus pengalaman di "${item.company}"?`)) return;
    try {
      await api.delete(`/experience/${item.id}`);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus data');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Experience</h2>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg">
          <FiPlus size={14} /> Tambah
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3">Perusahaan</th>
              <th className="px-4 py-3">Posisi</th>
              <th className="px-4 py-3">Periode</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Memuat...</td></tr>}
            {!loading && items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Belum ada data.</td></tr>
            )}
            {!loading && items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{item.company}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{item.position}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {new Date(item.startDate).toLocaleDateString('id-ID')} — {item.endDate ? new Date(item.endDate).toLocaleDateString('id-ID') : 'Sekarang'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                      <FiEdit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(item)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ExperienceForm
          item={editing}
          skills={skills}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); fetchItems(); }}
        />
      )}
    </div>
  );
}

function ExperienceForm({ item, skills, onClose, onSaved }) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      company: item?.company || '',
      logoUrl: item?.logoUrl || '',
      position: item?.position || '',
      location: item?.location || '',
      startDate: item?.startDate ? item.startDate.slice(0, 10) : '',
      endDate: item?.endDate ? item.endDate.slice(0, 10) : '',
      description: item?.description || '',
      order: item?.order || 0,
      skillIds: item?.skills?.map((s) => s.id) || [],
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = { ...data, order: Number(data.order) || 0 };
      Object.keys(payload).forEach((k) => { if (payload[k] === '') payload[k] = null; });

      if (item) {
        await api.put(`/experience/${item.id}`, payload);
      } else {
        await api.post('/experience', payload);
      }
      onSaved();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white">{item ? 'Edit Experience' : 'Tambah Experience'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perusahaan *</label>
            <input className="input" {...register('company', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posisi *</label>
            <input className="input" {...register('position', { required: true })} />
          </div>
          <Controller
            name="logoUrl"
            control={control}
            render={({ field }) => <FileUpload label="Logo Perusahaan" kind="image" value={field.value} onChange={field.onChange} />}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lokasi</label>
            <input className="input" {...register('location')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Mulai *</label>
              <input type="date" className="input" {...register('startDate', { required: true })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Selesai</label>
              <input type="date" className="input" {...register('endDate')} />
              <p className="text-xs text-gray-400 mt-1">Kosongkan jika masih bekerja di sini</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
            <textarea rows={3} className="input" {...register('description')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urutan</label>
            <input type="number" className="input" {...register('order')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill yang Digunakan</label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-2">
              {skills.length === 0 && <p className="text-xs text-gray-400">Belum ada data Skill.</p>}
              {skills.map((s) => (
                <label key={s.id} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
                  <input type="checkbox" value={s.id} {...register('skillIds')} />
                  {s.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600">Batal</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60">
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
