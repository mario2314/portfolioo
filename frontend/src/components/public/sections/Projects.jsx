import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects', { params: { limit: 12 } })
      .then((res) => setProjects(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Selected work" title="Featured Projects" />

        {!loading && projects.length === 0 && <EmptyState message="No projects available." />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {project.thumbnailUrl ? (
                  <img src={project.thumbnailUrl} alt={project.name} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  {project.featured && <FiStar className="text-amber-500" size={14} />}
                </div>
                {project.shortDescription && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{project.shortDescription}</p>
                )}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.techStack?.slice(0, 4).map((s) => (
                    <span key={s.id} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {s.name}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-3 text-gray-400">
                  {project.githubUrl && <FiGithub size={14} />}
                  {project.demoUrl && <FiExternalLink size={14} />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
