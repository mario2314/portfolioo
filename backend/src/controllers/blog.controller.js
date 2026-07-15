const prisma = require('../config/db');
const { buildCrud } = require('../utils/crudFactory');
const asyncHandler = require('../utils/asyncHandler');
const { uniqueSlug } = require('../utils/slugify');

const base = buildCrud(prisma.blogPost, {
  searchFields: ['title', 'content', 'category'],
  orderBy: [{ createdAt: 'desc' }],
  publicFilter: { publishedAt: { not: null, lte: new Date() } },
});

// Override create/update supaya slug otomatis dibuat dari title kalau tidak diisi manual.
const create = asyncHandler(async (req, res) => {
  const slug = req.body.slug ? req.body.slug : await uniqueSlug(prisma.blogPost, req.body.title);
  const item = await prisma.blogPost.create({ data: { ...req.body, slug } });
  res.status(201).json({ success: true, data: item });
});

const update = asyncHandler(async (req, res) => {
  let data = { ...req.body };
  if (req.body.slug) {
    data.slug = await uniqueSlug(prisma.blogPost, req.body.slug, req.params.id);
  }
  const item = await prisma.blogPost.update({ where: { id: req.params.id }, data });
  res.json({ success: true, data: item });
});

module.exports = { ...base, create, update };
