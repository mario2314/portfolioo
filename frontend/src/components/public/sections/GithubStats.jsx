import { useEffect, useState } from 'react';
import { FiGithub, FiStar, FiUsers, FiBook } from 'react-icons/fi';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

export default function GithubStats() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/github/stats')
      .then((res) => setData(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section id="github" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Open source" title="GitHub Activity" />

        {(error || !data) && <EmptyState message="Belum ada data." />}

        {data && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:flex-row items-center gap-6">
            {data.avatarUrl && <img src={data.avatarUrl} alt={data.username} className="w-16 h-16 rounded-full" />}
            <div className="flex-1 text-center sm:text-left">
              <a href={data.profileUrl} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 justify-center sm:justify-start">
                <FiGithub size={16} /> @{data.username}
              </a>
              {data.bio && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data.bio}</p>}
              {data.topLanguages?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 justify-center sm:justify-start">
                  {data.topLanguages.map((lang) => (
                    <span key={lang} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{lang}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1 justify-center"><FiBook size={14} />{data.publicRepos}</p>
                <p className="text-xs text-gray-400">Repos</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1 justify-center"><FiStar size={14} />{data.totalStars}</p>
                <p className="text-xs text-gray-400">Stars</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1 justify-center"><FiUsers size={14} />{data.followers}</p>
                <p className="text-xs text-gray-400">Followers</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
