const { PrismaClient } = require('@prisma/client');

// Singleton — hindari bikin banyak koneksi saat nodemon reload di dev.
const prisma = global.__prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma;
}

module.exports = prisma;
