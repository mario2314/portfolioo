const asyncHandler = require('./asyncHandler');

/**
 * Untuk model yang cuma punya satu baris (Hero, About, SiteSettings).
 * GET selalu ambil baris pertama. PUT meng-update baris itu, atau bikin baru
 * kalau entah kenapa belum ada (mis. seeding belum jalan).
 */
function buildSingleton(prismaModel) {
  const getOne = asyncHandler(async (req, res) => {
    let item = await prismaModel.findFirst();
    if (!item) {
      item = await prismaModel.create({ data: {} });
    }
    res.json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    let item = await prismaModel.findFirst();
    if (!item) {
      item = await prismaModel.create({ data: req.body });
    } else {
      item = await prismaModel.update({ where: { id: item.id }, data: req.body });
    }
    res.json({ success: true, data: item });
  });

  return { getOne, update };
}

module.exports = { buildSingleton };
