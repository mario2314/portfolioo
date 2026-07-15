import { useRef, useState } from 'react';
import { FiUploadCloud, FiFile, FiX, FiLoader } from 'react-icons/fi';
import api from '../../services/api';

/**
 * Upload gambar atau PDF ke Cloudinary lewat backend.
 * kind: 'image' | 'pdf'
 * value: URL yang sedang tersimpan (bisa kosong)
 * onChange(url): dipanggil setelah upload sukses (atau saat dihapus -> null)
 */
export default function FileUpload({ label, kind = 'image', value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const endpoint = kind === 'pdf' ? '/upload/pdf' : '/upload/image';
      const res = await api.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload gagal');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}

      <input
        ref={inputRef}
        type="file"
        accept={kind === 'pdf' ? 'application/pdf' : 'image/*'}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {!value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-6 text-sm text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors disabled:opacity-60"
        >
          {uploading ? <FiLoader className="animate-spin" size={16} /> : <FiUploadCloud size={16} />}
          {uploading ? 'Mengupload...' : `Upload ${kind === 'pdf' ? 'PDF' : 'gambar'}`}
        </button>
      )}

      {value && kind === 'image' && (
        <div className="relative inline-block">
          <img src={value} alt="preview" className="h-24 w-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            title="Hapus"
          >
            <FiX size={12} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="block mt-1 text-xs text-blue-600 hover:underline"
          >
            {uploading ? 'Mengupload...' : 'Ganti gambar'}
          </button>
        </div>
      )}

      {value && kind === 'pdf' && (
        <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
          <FiFile className="text-gray-400 shrink-0" size={18} />
          <a href={value} target="_blank" rel="noreferrer" className="text-sm text-blue-600 truncate flex-1">
            Lihat file
          </a>
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="text-xs text-blue-600 hover:underline shrink-0">
            {uploading ? '...' : 'Ganti'}
          </button>
          <button type="button" onClick={() => onChange(null)} className="text-red-500 shrink-0">
            <FiX size={14} />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
