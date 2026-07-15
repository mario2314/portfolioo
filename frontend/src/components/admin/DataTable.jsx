import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function DataTable({
  title,
  columns,
  data,
  loading,
  page,
  totalPages,
  onPageChange,
  search,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
        <div className="flex items-center gap-2">
          {onSearchChange && (
            <div className="relative">
              <FiSearch className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari..."
                className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg"
            >
              <FiPlus size={14} /> Tambah
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium">{col.label}</th>
              ))}
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-400">Memuat...</td></tr>
            )}
            {!loading && data.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-400">Belum ada data.</td></tr>
            )}
            {!loading && data.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {col.render ? col.render(row) : (row[col.key] ?? '-')}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                        <FiEdit2 size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
                        <FiTrash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
          <span>Halaman {page} dari {totalPages}</span>
          <div className="flex gap-1">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="p-1.5 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-40"
            >
              <FiChevronLeft size={15} />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="p-1.5 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-40"
            >
              <FiChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
