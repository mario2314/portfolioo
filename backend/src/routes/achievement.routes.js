const express = require('express');
const controller = require('../controllers/achievement.controller');
const { createAchievementSchema, updateAchievementSchema } = require('../validators/achievement.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', requireAdmin, validate(createAchievementSchema), controller.create);
router.put('/:id', requireAdmin, validate(updateAchievementSchema), controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
