import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiLock } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import api from '../../services/api';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    api.get('/settings').then((res) => setLogoUrl(res.data.data?.logoUrl || null)).catch(() => {});
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          {logoUrl ? <img src={logoUrl} alt="Logo" className="h-7 w-7 rounded" /> : null}
          Portfolio
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/admin"
            title="Admin"
            className="hidden md:inline-flex p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FiLock size={18} />
          </Link>
          <button className="md:hidden p-2 text-gray-600 dark:text-gray-300" onClick={() => setOpen((o) => !o)}>
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-gray-600 dark:text-gray-300 py-1"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 py-1"
          >
            <FiLock size={14} /> Admin
          </Link>
        </nav>
      )}
    </header>
  );
}
