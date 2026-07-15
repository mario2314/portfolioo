const { z } = require('zod');

const statusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

const createProjectSchema = z.object({
  thumbnailUrl: z.string().url().optional().nullable(),
  name: z.string().min(1, 'Nama project wajib diisi'),
  slug: z.string().optional(),
  shortDescription: z.string().optional().nullable(),
  fullDescription: z.string().optional().nullable(),
  challenge: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  process: z.string().optional().nullable(),
  result: z.string().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  demoUrl: z.string().url().optional().nullable(),
  videoUrl: z.string().url().optional().nullable(),
  featured: z.boolean().default(false),
  category: z.string().optional().nullable(),
  projectDate: z.coerce.date().optional().nullable(),
  status: statusEnum.default('DRAFT'),
  order: z.number().int().default(0),
  techStackIds: z.array(z.string().uuid()).default([]),
  galleryUrls: z.array(z.string().url()).default([]),
});

const updateProjectSchema = createProjectSchema.partial();

module.exports = { createProjectSchema, updateProjectSchema };
