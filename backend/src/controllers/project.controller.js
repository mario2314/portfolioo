const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { uniqueSlug } = require('../utils/slugify');

const includeRelations = { techStack: true, gallery: { orderBy: { order: 'asc' } } };

const list = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const where = req.publicOnly ? { status: 'PUBLISHED' } : {};
  if (req.query.search) {
    where.OR = [
      { name: { contains: req.query.search } },
      { category: { contains: req.query.search } },
    ];
  }
  if (req.query.category) where.category = req.query.category;
  if (req.query.featured) where.featured = req.query.featured === 'true';
  if (!req.publicOnly && req.query.status) where.status = req.query.status;

  const [items, total] = await Promise.all([
    prisma.project.findMany({ where, skip, take: limit, orderBy: [{ order: 'asc' }, { projectDate: 'desc' }], include: includeRelations }),
    prisma.project.count({ where }),
  ]);

  res.json({ success: true, data: items, meta: { page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1) } });
});

const getOne = asyncHandler(async (req, res) => {
  const item = await prisma.project.findUnique({ where: { id: req.params.id }, include: includeRelations });
  if (!item) return res.status(404).json({ success: false, message: 'Project tidak ditemukan' });
  res.json({ success: true, data: item });
});

const getBySlug = asyncHandler(async (req, res) => {
  const where = { slug: req.params.slug, ...(req.publicOnly ? { status: 'PUBLISHED' } : {}) };
  const item = await prisma.project.findFirst({ where, include: includeRelations });
  if (!item) return res.status(404).json({ success: false, message: 'Project tidak ditemukan' });
  res.json({ success: true, data: item });
});

const create = asyncHandler(async (req, res) => {
  const { techStackIds = [], galleryUrls = [], slug, name, ...rest } = req.body;
  const finalSlug = slug ? await uniqueSlug(prisma.project, slug) : await uniqueSlug(prisma.project, name);

  const item = await prisma.project.create({
    data: {
      ...rest,
      name,
      slug: finalSlug,
      techStack: { connect: techStackIds.map((id) => ({ id })) },
      gallery: { create: galleryUrls.map((url, i) => ({ url, order: i })) },
    },
    include: includeRelations,
  });
  res.status(201).json({ success: true, data: item });
});

const update = asyncHandler(async (req, res) => {
  const { techStackIds, galleryUrls, slug, ...rest } = req.body;
  const data = { ...rest };

  if (slug) data.slug = await uniqueSlug(prisma.project, slug, req.params.id);
  if (techStackIds) data.techStack = { set: techStackIds.map((id) => ({ id })) };
  if (galleryUrls) {
    await prisma.projectImage.deleteMany({ where: { projectId: req.params.id } });
    data.gallery = { create: galleryUrls.map((url, i) => ({ url, order: i })) };
  }

  const item = await prisma.project.update({ where: { id: req.params.id }, data, include: includeRelations });
  res.json({ success: true, data: item });
});

const remove = asyncHandler(async (req, res) => {
  await prisma.project.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Project berhasil dihapus' });
});

module.exports = { list, getOne, getBySlug, create, update, remove };
