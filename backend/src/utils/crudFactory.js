const asyncHandler = require('./asyncHandler');

/**
 * Membuat 5 handler CRUD standar (list, getOne, create, update, remove) untuk
 * satu model Prisma. Dipakai untuk resource yang tidak punya relasi rumit.
 *
 * options:
 *  - searchFields: kolom yang ikut di-search lewat ?search=
 *  - orderBy: default sorting
 *  - publicFilter: object where tambahan yang dipaksakan saat req.publicOnly = true
 *                  (dipasang oleh middleware restrictPublic di routes publik)
 */
function buildCrud(prismaModel, { searchFields = [], orderBy = { order: 'asc' }, publicFilter = {} } = {}) {
  const list = asyncHandler(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    let where = req.publicOnly ? { ...publicFilter } : {};

    if (req.query.search && searchFields.length) {
      where.OR = searchFields.map((f) => ({ [f]: { contains: req.query.search } }));
    }
    if (req.query.category) where.category = req.query.category;

    const [items, total] = await Promise.all([
      prismaModel.findMany({ where, skip, take: limit, orderBy }),
      prismaModel.count({ where }),
    ]);

    res.json({
      success: true,
      data: items,
      meta: { page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1) },
    });
  });

  const getOne = asyncHandler(async (req, res) => {
    const where = { id: req.params.id, ...(req.publicOnly ? publicFilter : {}) };
    const item = await prismaModel.findFirst({ where });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const item = await prismaModel.create({ data: req.body });
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const item = await prismaModel.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: item });
  });

  const getBySlug = asyncHandler(async (req, res) => {
    const where = { slug: req.params.slug, ...(req.publicOnly ? publicFilter : {}) };
    const item = await prismaModel.findFirst({ where });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    await prismaModel.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Berhasil dihapus' });
  });

  return { list, getOne, getBySlug, create, update, remove };
}

// Middleware kecil: tandai request ini datang dari route publik,
// supaya factory tahu harus menambahkan publicFilter.
function restrictPublic(req, res, next) {
  req.publicOnly = true;
  next();
}

module.exports = { buildCrud, restrictPublic };
