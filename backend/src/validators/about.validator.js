const { z } = require('zod');

const updateAboutSchema = z.object({
  photoUrl: z.string().url().optional().nullable(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  careerGoal: z.string().optional().nullable(),
  vision: z.string().optional().nullable(),
  mission: z.string().optional().nullable(),
});

module.exports = { updateAboutSchema };
