const express = require('express');
const controller = require('../controllers/skill.controller');
const { createSkillSchema, updateSkillSchema } = require('../validators/skill.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', requireAdmin, validate(createSkillSchema), controller.create);
router.put('/:id', requireAdmin, validate(updateSkillSchema), controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
