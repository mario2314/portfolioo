import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
