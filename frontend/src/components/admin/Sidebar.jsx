import { NavLink } from 'react-router-dom';
import {
  FiHome, FiUser, FiInfo, FiCode, FiBriefcase, FiBook, FiAward,
  FiStar, FiFileText, FiMessageSquare, FiMail, FiSettings, FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const links = [
  { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/admin/hero', label: 'Hero', icon: FiUser },
  { to: '/admin/about', label: 'About Me', icon: FiInfo },
  { to: '/admin/skills', label: 'Skills', icon: FiCode },
  { to: '/admin/projects', label: 'Projects', icon: FiBriefcase },
  { to: '/admin/experience', label: 'Experience', icon: FiBriefcase },
  { to: '/admin/education', label: 'Education', icon: FiBook },
  { to: '/admin/certifications', label: 'Certifications', icon: FiAward },
  { to: '/admin/achievements', label: 'Achievements', icon: FiStar },
  { to: '/admin/blog', label: 'Blog', icon: FiFileText },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { to: '/admin/messages', label: 'Pesan Masuk', icon: FiMail },
  { to: '/admin/settings', label: 'Site Settings', icon: FiSettings },
];

export default function Sidebar() {
  const { logout, admin } = useAuth();

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-white">Portfolio Admin</p>
        {admin?.email && <p className="text-xs text-gray-500 truncate">{admin.email}</p>}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
