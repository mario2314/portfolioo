const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const xss = require('xss');

const create = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const item = await prisma.contactMessage.create({
    data: { name: xss(name), email: xss(email), message: xss(message) },
  });
  res.status(201).json({ success: true, message: 'Pesan berhasil dikirim', data: { id: item.id } });
});

const list = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const where = {};
  if (req.query.isRead !== undefined) where.isRead = req.query.isRead === 'true';

  const [items, total] = await Promise.all([
    prisma.contactMessage.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.contactMessage.count({ where }),
  ]);

  res.json({ success: true, data: items, meta: { page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1) } });
});

const markRead = asyncHandler(async (req, res) => {
  const item = await prisma.contactMessage.update({ where: { id: req.params.id }, data: { isRead: true } });
  res.json({ success: true, data: item });
});

const remove = asyncHandler(async (req, res) => {
  await prisma.contactMessage.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Pesan berhasil dihapus' });
});

module.exports = { create, list, markRead, remove };
