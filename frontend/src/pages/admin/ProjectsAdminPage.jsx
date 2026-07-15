import { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { FiPlus, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import api from '../../services/api';
import FileUpload from '../../components/admin/FileUpload';

const statusOptions = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects/admin/all', { params: { page, limit: 10, search } });
      setProjects(res.data.data);
      setTotalPages(res.data.meta?.totalPages || 1);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);
  useEffect(() => {
    api.get('/skills', { params: { limit: 100 } }).then((res) => setSkills(res.data.data));
  }, []);

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p); setModalOpen(true); };

  const handleDelete = async (p) => {
    if (!window.confirm(`Hapus project "${p.name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await api.delete(`/projects/${p.id}`);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus project');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Featured Projects</h2>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Cari project..."
            className="text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-1.5"
          />
          <button onClick={openAdd} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg">
            <FiPlus size={14} /> Tambah
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Memuat...</td></tr>}
            {!loading && projects.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Belum ada project.</td></tr>
            )}
            {!loading && projects.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{p.name}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{p.category || '-'}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{p.status}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{p.featured ? 'Ya' : '-'}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                      <FiEdit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(p)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end gap-2 text-sm text-gray-500">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 border rounded disabled:opacity-40">Sebelumnya</button>
          <span>Halaman {page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded disabled:opacity-40">Selanjutnya</button>
        </div>
      )}

      {modalOpen && (
        <ProjectForm
          project={editing}
          skills={skills}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); fetchProjects(); }}
        />
      )}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  );
}

function ProjectForm({ project, skills, onClose, onSaved }) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      thumbnailUrl: project?.thumbnailUrl || '',
      name: project?.name || '',
      category: project?.category || '',
      status: project?.status || 'DRAFT',
      featured: project?.featured || false,
      shortDescription: project?.shortDescription || '',
      fullDescription: project?.fullDescription || '',
      challenge: project?.challenge || '',
      solution: project?.solution || '',
      process: project?.process || '',
      result: project?.result || '',
      githubUrl: project?.githubUrl || '',
      demoUrl: project?.demoUrl || '',
      videoUrl: project?.videoUrl || '',
      projectDate: project?.projectDate ? project.projectDate.slice(0, 10) : '',
      order: project?.order || 0,
      techStackIds: project?.techStack?.map((s) => s.id) || [],
      gallery: project?.gallery?.map((g) => ({ url: g.url })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'gallery' });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        featured: !!data.featured,
        order: Number(data.order) || 0,
        galleryUrls: data.gallery.map((g) => g.url).filter(Boolean),
      };
      delete payload.gallery;
      Object.keys(payload).forEach((k) => { if (payload[k] === '') payload[k] = null; });

      if (project) {
        await api.put(`/projects/${project.id}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      onSaved();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="font-semibold text-gray-900 dark:text-white">{project ? 'Edit Project' : 'Tambah Project'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <Field label="Nama Project" required><input className="input" {...register('name', { required: true })} /></Field>
          <Controller
            name="thumbnailUrl"
            control={control}
            render={({ field }) => <FileUpload label="Thumbnail" kind="image" value={field.value} onChange={field.onChange} />}
          />

          <div className="grid grid-cols-2 gap-4">
            <Field label="Kategori"><input className="input" {...register('category')} /></Field>
            <Field label="Tanggal Project"><input type="date" className="input" {...register('projectDate')} /></Field>
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <Field label="Status">
              <select className="input" {...register('status')}>
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
              <input type="checkbox" {...register('featured')} /> Featured
            </label>
          </div>

          <Field label="Deskripsi Singkat"><textarea rows={2} className="input" {...register('shortDescription')} /></Field>
          <Field label="Deskripsi Lengkap"><textarea rows={4} className="input" {...register('fullDescription')} /></Field>
          <Field label="Challenge"><textarea rows={2} className="input" {...register('challenge')} /></Field>
          <Field label="Solution"><textarea rows={2} className="input" {...register('solution')} /></Field>
          <Field label="Development Process"><textarea rows={2} className="input" {...register('process')} /></Field>
          <Field label="Result"><textarea rows={2} className="input" {...register('result')} /></Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="GitHub URL"><input type="url" className="input" {...register('githubUrl')} /></Field>
            <Field label="Demo URL"><input type="url" className="input" {...register('demoUrl')} /></Field>
            <Field label="Video Demo URL"><input type="url" className="input" {...register('videoUrl')} /></Field>
          </div>

          <Field label="Urutan"><input type="number" className="input" {...register('order')} /></Field>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tech Stack</label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-2">
              {skills.length === 0 && <p className="text-xs text-gray-400">Belum ada data Skill — tambahkan dulu di menu Skills.</p>}
              {skills.map((s) => (
                <label key={s.id} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
                  <input type="checkbox" value={s.id} {...register('techStackIds')} />
                  {s.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gallery Gambar</label>
              <button type="button" onClick={() => append({ url: '' })} className="text-xs text-blue-600 flex items-center gap-1">
                <FiPlus size={12} /> Tambah gambar
              </button>
            </div>
            <div className="space-y-3">
              {fields.map((field, idx) => (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="flex-1">
                    <Controller
                      name={`gallery.${idx}.url`}
                      control={control}
                      render={({ field: f }) => <FileUpload kind="image" value={f.value} onChange={f.onChange} />}
                    />
                  </div>
                  <button type="button" onClick={() => remove(idx)} className="text-red-500 p-2 mt-1"><FiTrash2 size={14} /></button>
                </div>
              ))}
              {fields.length === 0 && <p className="text-xs text-gray-400">Belum ada gambar gallery.</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 sticky bottom-0 bg-white dark:bg-gray-800 pb-1">
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
