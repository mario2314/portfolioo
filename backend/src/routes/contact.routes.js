const express = require('express');
const controller = require('../controllers/contact.controller');
const { createContactSchema } = require('../validators/contact.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');
const { contactLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

// Publik: kirim pesan lewat form contact
router.post('/', contactLimiter, validate(createContactSchema), controller.create);

// Admin: baca pesan masuk
router.get('/', requireAdmin, controller.list);
router.patch('/:id/read', requireAdmin, controller.markRead);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
