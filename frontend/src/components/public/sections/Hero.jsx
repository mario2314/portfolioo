import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail } from 'react-icons/fi';
import api from '../../../services/api';

export default function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    api.get('/hero').then((res) => setHero(res.data.data)).catch(() => {});
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16"
      style={hero?.backgroundUrl ? { backgroundImage: `url(${hero.backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {/* Animasi tech background sederhana — cincin gradient berputar pelan, tanpa parallax */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[420px] h-[420px] rounded-full border border-blue-500/20 dark:border-blue-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-blue-500/30 dark:border-blue-400/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute w-[220px] h-[220px] rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto text-center">
        {hero?.photoUrl && (
          <img
            src={hero.photoUrl}
            alt={hero?.name || 'Profile'}
            className="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-4 border-white dark:border-gray-800 shadow-sm"
          />
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          {hero?.name || 'Belum ada data.'}
        </h1>
        {hero?.profession && (
          <p className="mt-2 text-lg text-blue-600 dark:text-blue-400 font-medium">{hero.profession}</p>
        )}
        {hero?.headline && (
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">{hero.headline}</p>
        )}
        {hero?.subheadline && (
          <p className="mt-3 text-gray-500 dark:text-gray-400">{hero.subheadline}</p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {hero?.cvUrl && (
            <a
              href={hero.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              <FiDownload size={16} /> Download CV
            </a>
          )}
          <a
            href="#contact"
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiMail size={16} /> Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
