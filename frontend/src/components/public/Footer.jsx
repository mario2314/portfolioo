import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';
import api from '../../services/api';

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {settings?.footerCopyright || `© ${year}. Hak cipta dilindungi.`}
        </p>
        <div className="flex items-center gap-4 text-gray-400">
          {settings?.email && (
            <a href={`mailto:${settings.email}`} aria-label="Email"><FiMail size={18} className="hover:text-blue-600" /></a>
          )}
          {settings?.github && (
            <a href={settings.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub size={18} className="hover:text-blue-600" /></a>
          )}
          {settings?.linkedin && (
            <a href={settings.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={18} className="hover:text-blue-600" /></a>
          )}
          {settings?.instagram && (
            <a href={settings.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram size={18} className="hover:text-blue-600" /></a>
          )}
        </div>
      </div>
    </footer>
  );
}
