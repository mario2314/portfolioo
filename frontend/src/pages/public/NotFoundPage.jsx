import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-6xl font-bold text-gray-200 dark:text-gray-700">404</p>
      <p className="text-gray-500">Halaman tidak ditemukan.</p>
      <Link to="/" className="text-blue-600 text-sm">&larr; Kembali ke beranda</Link>
    </div>
  );
}
