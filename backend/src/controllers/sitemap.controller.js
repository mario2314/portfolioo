const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

function xmlEscape(str) {
  return String(str).replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[c]));
}

const getSitemap = asyncHandler(async (req, res) => {
  const settings = await prisma.siteSettings.findFirst();
  // canonicalUrl dipakai sebagai base URL situs publik (Vercel), BUKAN base URL backend ini —
  // sitemap file-nya boleh di-host di sini, isinya tetap menunjuk ke domain frontend.
  const baseUrl = (settings?.canonicalUrl || '').replace(/\/$/, '') || 'https://example.com';

  const [projects, posts] = await Promise.all([
    prisma.project.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { publishedAt: { not: null, lte: new Date() } }, select: { slug: true, updatedAt: true } }),
  ]);

  const urls = [
    { loc: `${baseUrl}/`, changefreq: 'weekly', priority: '1.0' },
    ...projects.map((p) => ({ loc: `${baseUrl}/projects/${p.slug}`, lastmod: p.updatedAt.toISOString(), changefreq: 'monthly', priority: '0.8' })),
    ...posts.map((p) => ({ loc: `${baseUrl}/blog/${p.slug}`, lastmod: p.updatedAt.toISOString(), changefreq: 'monthly', priority: '0.6' })),
  ];

  const body = urls
    .map((u) => `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

module.exports = { getSitemap };
