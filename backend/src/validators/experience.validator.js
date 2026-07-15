const { z } = require('zod');

const createExperienceSchema = z.object({
  company: z.string().min(1, 'Nama perusahaan wajib diisi'),
  logoUrl: z.string().url().optional().nullable(),
  position: z.string().min(1, 'Posisi wajib diisi'),
  location: z.string().optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  description: z.string().optional().nullable(),
  order: z.number().int().default(0),
  skillIds: z.array(z.string().uuid()).default([]),
});

const updateExperienceSchema = createExperienceSchema.partial();

module.exports = { createExperienceSchema, updateExperienceSchema };
