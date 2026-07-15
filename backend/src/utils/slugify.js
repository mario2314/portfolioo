const slugify = require('slugify');
const prisma = require('../config/db');

// Generate slug unik — kalau "judul-artikel" sudah dipakai, jadi "judul-artikel-2", dst.
async function uniqueSlug(model, text, ignoreId = null) {
  const base = slugify(text, { lower: true, strict: true });
  let slug = base;
  let counter = 2;

  while (true) {
    const existing = await model.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${counter}`;
    counter += 1;
  }
}

module.exports = { uniqueSlug };
