const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Terlalu banyak percobaan login. Coba lagi nanti.' },
});

// Batasi spam form kontak — 5 pesan per jam per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Terlalu banyak pesan dikirim. Coba lagi nanti.' },
});

module.exports = { loginLimiter, contactLimiter };
