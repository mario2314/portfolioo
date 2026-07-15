const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const includeRelations = { skills: true };

const list = asyncHandler(async (req, res) => {
  const items = await prisma.experience.findMany({ orderBy: [{ startDate: 'desc' }], include: includeRelations });
  res.json({ success: true, data: items });
});

const getOne = asyncHandler(async (req, res) => {
  const item = await prisma.experience.findUnique({ where: { id: req.params.id }, include: includeRelations });
  if (!item) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
  res.json({ success: true, data: item });
});

const create = asyncHandler(async (req, res) => {
  const { skillIds = [], ...rest } = req.body;
  const item = await prisma.experience.create({
    data: { ...rest, skills: { connect: skillIds.map((id) => ({ id })) } },
    include: includeRelations,
  });
  res.status(201).json({ success: true, data: item });
});

const update = asyncHandler(async (req, res) => {
  const { skillIds, ...rest } = req.body;
  const data = { ...rest };
  if (skillIds) data.skills = { set: skillIds.map((id) => ({ id })) };

  const item = await prisma.experience.update({ where: { id: req.params.id }, data, include: includeRelations });
  res.json({ success: true, data: item });
});

const remove = asyncHandler(async (req, res) => {
  await prisma.experience.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Berhasil dihapus' });
});

module.exports = { list, getOne, create, update, remove };
