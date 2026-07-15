const { z } = require('zod');

const categoryEnum = z.enum([
  'PROGRAMMING_LANGUAGE', 'FRAMEWORK', 'DATABASE', 'CLOUD', 'TOOLS', 'AI', 'ROBOTICS',
]);

const createSkillSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  iconUrl: z.string().url().optional().nullable(),
  category: categoryEnum,
  level: z.number().int().min(0).max(100).default(0),
  order: z.number().int().default(0),
});

const updateSkillSchema = createSkillSchema.partial();

module.exports = { createSkillSchema, updateSkillSchema };
