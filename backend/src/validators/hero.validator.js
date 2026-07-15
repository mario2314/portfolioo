const { z } = require('zod');

const updateHeroSchema = z.object({
  photoUrl: z.string().url().optional().nullable(),
  name: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  headline: z.string().optional().nullable(),
  subheadline: z.string().optional().nullable(),
  backgroundUrl: z.string().url().optional().nullable(),
  cvUrl: z.string().url().optional().nullable(),
});

module.exports = { updateHeroSchema };
