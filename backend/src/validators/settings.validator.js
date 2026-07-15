const { z } = require('zod');

const updateSettingsSchema = z.object({
  email: z.string().email().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  linkedin: z.string().url().optional().nullable(),
  github: z.string().url().optional().nullable(),
  instagram: z.string().url().optional().nullable(),
  location: z.string().optional().nullable(),
  mapEmbedUrl: z.string().optional().nullable(),
  githubUsername: z.string().optional().nullable(),
  footerCopyright: z.string().optional().nullable(),
  footerQuickLinks: z.any().optional().nullable(),
  logoUrl: z.string().url().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: z.string().optional().nullable(),
  ogImage: z.string().url().optional().nullable(),
  twitterCard: z.string().optional().nullable(),
  canonicalUrl: z.string().url().optional().nullable(),
});

module.exports = { updateSettingsSchema };
