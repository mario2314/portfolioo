const { z } = require('zod');

const createCertificationSchema = z.object({
  name: z.string().min(1, 'Nama sertifikat wajib diisi'),
  issuer: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  credentialUrl: z.string().url().optional().nullable(),
  order: z.number().int().default(0),
});

const updateCertificationSchema = createCertificationSchema.partial();

module.exports = { createCertificationSchema, updateCertificationSchema };
