import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import api from '../../services/api';
import FileUpload from './FileUpload';

export default function SingletonManager({ title, endpoint, fields }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const { register, handleSubmit, reset, control } = useForm();

  useEffect(() => {
    let mounted = true;
    api.get(endpoint).then((res) => {
      if (mounted) {
        reset(res.data.data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [endpoint, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    setSavedMsg('');
    try {
      const cleaned = { ...data };
      Object.keys(cleaned).forEach((k) => {
        if (cleaned[k] === '') cleaned[k] = null;
      });
      const res = await api.put(endpoint, cleaned);
      reset(res.data.data);
      setSavedMsg('Tersimpan.');
      setTimeout(() => setSavedMsg(''), 2500);
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-400">Memuat...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 max-w-2xl">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-5">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((f) => (
          <div key={f.name}>
            {(f.type === 'image' || f.type === 'pdf') ? (
              <Controller
                name={f.name}
                control={control}
                render={({ field }) => (
                  <FileUpload label={f.label} kind={f.type} value={field.value} onChange={field.onChange} />
                )}
              />
            ) : (
              <>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    rows={f.rows || 4}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(f.name)}
                  />
                ) : (
                  <input
                    type={f.type || 'text'}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(f.name)}
                  />
                )}
              </>
            )}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
          >
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          {savedMsg && <span className="text-sm text-green-600">{savedMsg}</span>}
        </div>
      </form>
    </div>
  );
}
