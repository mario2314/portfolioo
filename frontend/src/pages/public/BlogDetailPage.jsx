import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setPost(null);
    setNotFound(false);
    api.get(`/blog/slug/${slug}`)
      .then((res) => setPost(res.data.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-gray-500">Artikel tidak ditemukan.</p>
        <Link to="/" className="text-blue-600 text-sm">&larr; Kembali ke beranda</Link>
      </div>
    );
  }

  if (!post) return <div className="min-h-screen" />;

  return (
    <article className="pt-24 pb-20 px-4 max-w-2xl mx-auto">
      <Helmet>
        <title>{post.seoTitle || post.title} — Blog</title>
        {post.seoDescription && <meta name="description" content={post.seoDescription} />}
        <meta property="og:title" content={post.seoTitle || post.title} />
        {post.seoDescription && <meta property="og:description" content={post.seoDescription} />}
        {post.thumbnailUrl && <meta property="og:image" content={post.thumbnailUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Link to="/#blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 mb-6">
        <FiArrowLeft size={14} /> Kembali
      </Link>

      {post.thumbnailUrl && (
        <img src={post.thumbnailUrl} alt={post.title} className="w-full rounded-2xl aspect-[16/9] object-cover mb-6" />
      )}

      {post.category && <p className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">{post.category}</p>}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
      {post.publishedAt && (
        <p className="text-sm text-gray-400 mt-2">
          {new Date(post.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      )}

      <div className="prose prose-sm dark:prose-invert max-w-none mt-8 whitespace-pre-wrap">{post.content}</div>

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-8">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">#{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
}
