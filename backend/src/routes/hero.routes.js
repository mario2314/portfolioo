const express = require('express');
const controller = require('../controllers/hero.controller');
const { updateHeroSchema } = require('../validators/hero.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.getOne);
router.put('/', requireAdmin, validate(updateHeroSchema), controller.update);

module.exports = router;
