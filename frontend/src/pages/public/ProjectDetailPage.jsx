import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import api from '../../services/api';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setProject(null);
    setNotFound(false);
    api.get(`/projects/slug/${slug}`)
      .then((res) => setProject(res.data.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-gray-500">Project tidak ditemukan.</p>
        <Link to="/" className="text-blue-600 text-sm">&larr; Kembali ke beranda</Link>
      </div>
    );
  }

  if (!project) return <div className="min-h-screen" />;

  return (
    <article className="pt-24 pb-20 px-4 max-w-3xl mx-auto">
      <Helmet>
        <title>{project.name} — Portfolio</title>
        {project.shortDescription && <meta name="description" content={project.shortDescription} />}
        <meta property="og:title" content={project.name} />
        {project.shortDescription && <meta property="og:description" content={project.shortDescription} />}
        {project.thumbnailUrl && <meta property="og:image" content={project.thumbnailUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Link to="/#projects" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 mb-6">
        <FiArrowLeft size={14} /> Kembali
      </Link>

      {project.thumbnailUrl && (
        <img src={project.thumbnailUrl} alt={project.name} className="w-full rounded-2xl aspect-[16/9] object-cover mb-6" />
      )}

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
      {project.category && <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">{project.category}</p>}

      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.techStack?.map((s) => (
          <span key={s.id} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">{s.name}</span>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2">
            <FiGithub size={14} /> GitHub
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm bg-blue-600 text-white rounded-full px-4 py-2">
            <FiExternalLink size={14} /> Live Demo
          </a>
        )}
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none mt-8 space-y-6">
        {project.fullDescription && <p className="whitespace-pre-wrap">{project.fullDescription}</p>}
        {project.challenge && (
          <div><h3 className="font-semibold">Challenge</h3><p className="whitespace-pre-wrap">{project.challenge}</p></div>
        )}
        {project.solution && (
          <div><h3 className="font-semibold">Solution</h3><p className="whitespace-pre-wrap">{project.solution}</p></div>
        )}
        {project.process && (
          <div><h3 className="font-semibold">Development Process</h3><p className="whitespace-pre-wrap">{project.process}</p></div>
        )}
        {project.result && (
          <div><h3 className="font-semibold">Result</h3><p className="whitespace-pre-wrap">{project.result}</p></div>
        )}
      </div>

      {project.gallery?.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {project.gallery.map((img) => (
            <img key={img.id} src={img.url} alt="" className="rounded-xl w-full object-cover" />
          ))}
        </div>
      )}
    </article>
  );
}
