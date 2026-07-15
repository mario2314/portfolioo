export default function EmptyState({ message = 'Belum ada data.' }) {
  return (
    <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
      {message}
    </div>
  );
}
