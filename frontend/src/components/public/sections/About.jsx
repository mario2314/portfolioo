import { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api.get('/about').then((res) => setAbout(res.data.data)).catch(() => {});
  }, []);

  const hasContent = about && (about.description || about.title);

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Get to know me" title={about?.title || 'About Me'} />

        {!hasContent && <EmptyState message="Belum ada data." />}

        {hasContent && (
          <div className="grid sm:grid-cols-3 gap-8 items-start">
            {about.photoUrl && (
              <img src={about.photoUrl} alt="About" className="rounded-2xl w-full aspect-square object-cover sm:col-span-1" />
            )}
            <div className={about.photoUrl ? 'sm:col-span-2 space-y-4' : 'sm:col-span-3 space-y-4'}>
              {about.description && <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{about.description}</p>}
              {about.careerGoal && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Tujuan Karier</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{about.careerGoal}</p>
                </div>
              )}
              {about.vision && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Visi</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{about.vision}</p>
                </div>
              )}
              {about.mission && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Misi</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{about.mission}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
