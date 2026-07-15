import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../SectionHeading';
import EmptyState from '../EmptyState';
import api from '../../../services/api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog', { params: { limit: 6 } }).then((res) => setPosts(res.data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="Writing" title="Blog / Articles" />

        {!loading && posts.length === 0 && <EmptyState message="Belum ada artikel." />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {post.thumbnailUrl ? (
                  <img src={post.thumbnailUrl} alt={post.title} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
                )}
              </div>
              <div className="p-4">
                {post.category && <p className="text-[11px] uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">{post.category}</p>}
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{post.title}</h3>
                {post.publishedAt && (
                  <p className="text-xs text-gray-400 mt-2">{new Date(post.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
