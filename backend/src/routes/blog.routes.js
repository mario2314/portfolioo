const express = require('express');
const controller = require('../controllers/blog.controller');
const { createBlogSchema, updateBlogSchema } = require('../validators/blog.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');
const { restrictPublic } = require('../utils/crudFactory');

const router = express.Router();

// Publik: hanya artikel yang sudah published
router.get('/', restrictPublic, controller.list);
router.get('/slug/:slug', restrictPublic, controller.getBySlug);

// Admin: lihat semua termasuk draft, plus CRUD
router.get('/admin/all', requireAdmin, controller.list);
router.get('/:id', requireAdmin, controller.getOne);
router.post('/', requireAdmin, validate(createBlogSchema), controller.create);
router.put('/:id', requireAdmin, validate(updateBlogSchema), controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
