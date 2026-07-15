import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import SectionHeading from '../SectionHeading';
import api from '../../../services/api';

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      await api.post('/contact', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Let's talk" title="Contact" />

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            {settings?.email && (
              <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><FiMail size={16} /> {settings.email}</p>
            )}
            {settings?.location && (
              <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><FiMapPin size={16} /> {settings.location}</p>
            )}
            {settings?.mapEmbedUrl && (
              <iframe
                src={settings.mapEmbedUrl}
                className="w-full h-48 rounded-xl border border-gray-200 dark:border-gray-700 mt-2"
                loading="lazy"
                title="Lokasi"
              />
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <input
                placeholder="Nama"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('name', { required: true })}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">Nama wajib diisi</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">Email wajib diisi</p>}
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Pesan"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('message', { required: true })}
              />
              {errors.message && <p className="text-xs text-red-600 mt-1">Pesan wajib diisi</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              <FiSend size={14} /> {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>

            {status === 'success' && <p className="text-sm text-green-600">Pesan terkirim, terima kasih!</p>}
            {status === 'error' && <p className="text-sm text-red-600">Gagal mengirim pesan, coba lagi.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
