const express = require('express');
const controller = require('../controllers/education.controller');
const { createEducationSchema, updateEducationSchema } = require('../validators/education.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', requireAdmin, validate(createEducationSchema), controller.create);
router.put('/:id', requireAdmin, validate(updateEducationSchema), controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
