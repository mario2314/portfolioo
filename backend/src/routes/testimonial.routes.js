const express = require('express');
const controller = require('../controllers/testimonial.controller');
const { createTestimonialSchema, updateTestimonialSchema } = require('../validators/testimonial.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', requireAdmin, validate(createTestimonialSchema), controller.create);
router.put('/:id', requireAdmin, validate(updateTestimonialSchema), controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
