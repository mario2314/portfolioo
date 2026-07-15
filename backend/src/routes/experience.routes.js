const express = require('express');
const controller = require('../controllers/experience.controller');
const { createExperienceSchema, updateExperienceSchema } = require('../validators/experience.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', requireAdmin, validate(createExperienceSchema), controller.create);
router.put('/:id', requireAdmin, validate(updateExperienceSchema), controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
