const { z } = require('zod');

const createEducationSchema = z.object({
  school: z.string().min(1, 'Nama sekolah/kampus wajib diisi'),
  major: z.string().optional().nullable(),
  logoUrl: z.string().url().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  description: z.string().optional().nullable(),
  gpa: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

const updateEducationSchema = createEducationSchema.partial();

module.exports = { createEducationSchema, updateEducationSchema };
