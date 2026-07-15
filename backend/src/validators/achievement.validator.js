const { z } = require('zod');

const createAchievementSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  description: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  category: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  order: z.number().int().default(0),
});

const updateAchievementSchema = createAchievementSchema.partial();

module.exports = { createAchievementSchema, updateAchievementSchema };
