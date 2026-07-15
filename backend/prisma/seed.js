require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL dan ADMIN_PASSWORD wajib diisi di .env sebelum seeding');
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 12);
    await prisma.admin.create({ data: { email, password: hashed } });
    console.log(`Admin dibuat: ${email}`);
  } else {
    console.log('Admin sudah ada, dilewati.');
  }

  // Baris singleton awal — biar frontend langsung punya sesuatu untuk di-fetch
  // (isinya tetap kosong/null, admin isi lewat dashboard nanti)
  const heroCount = await prisma.hero.count();
  if (heroCount === 0) {
    await prisma.hero.create({ data: {} });
    console.log('Baris Hero awal dibuat (kosong).');
  }

  const aboutCount = await prisma.about.count();
  if (aboutCount === 0) {
    await prisma.about.create({ data: {} });
    console.log('Baris About awal dibuat (kosong).');
  }

  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({ data: {} });
    console.log('Baris SiteSettings awal dibuat (kosong).');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
