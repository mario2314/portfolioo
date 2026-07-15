const { z } = require('zod');

const createBlogSchema = z.object({
  thumbnailUrl: z.string().url().optional().nullable(),
  title: z.string().min(1, 'Judul wajib diisi'),
  slug: z.string().optional(), // auto-generate dari title kalau kosong
  content: z.string().min(1, 'Isi artikel wajib diisi'),
  category: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  publishedAt: z.coerce.date().optional().nullable(),
});

const updateBlogSchema = createBlogSchema.partial();

module.exports = { createBlogSchema, updateBlogSchema };
