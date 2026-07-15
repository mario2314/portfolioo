const { z } = require('zod');

const createTestimonialSchema = z.object({
  photoUrl: z.string().url().optional().nullable(),
  name: z.string().min(1, 'Nama wajib diisi'),
  position: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  content: z.string().min(1, 'Isi testimoni wajib diisi'),
  rating: z.number().int().min(1).max(5).default(5),
  order: z.number().int().default(0),
});

const updateTestimonialSchema = createTestimonialSchema.partial();

module.exports = { createTestimonialSchema, updateTestimonialSchema };
