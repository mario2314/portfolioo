function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} tidak ditemukan` });
}

function errorHandler(err, req, res, next) {
  // Multer: file terlalu besar / format tidak diizinkan
  if (err.name === 'MulterError') {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'Ukuran file terlalu besar' : err.message;
    return res.status(400).json({ success: false, message });
  }
  if (err.message && err.message.includes('allowed_formats')) {
    return res.status(400).json({ success: false, message: 'Format file tidak didukung' });
  }

  // Prisma: record tidak ditemukan saat update/delete
  if (err.code === 'P2025') {
    return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
  }
  // Prisma: pelanggaran unique constraint (mis. slug/email dobel)
  if (err.code === 'P2002') {
    const field = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field';
    return res.status(409).json({ success: false, message: `Data dengan ${field} tersebut sudah ada` });
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan pada server';

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(status).json({ success: false, message });
}

module.exports = { notFound, errorHandler };
