const { z } = require('zod');

const createContactSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi').max(100),
  email: z.string().email('Email tidak valid'),
  message: z.string().min(1, 'Pesan wajib diisi').max(5000),
});

module.exports = { createContactSchema };
