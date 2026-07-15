const express = require('express');
const controller = require('../controllers/settings.controller');
const { updateSettingsSchema } = require('../validators/settings.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.getOne);
router.put('/', requireAdmin, validate(updateSettingsSchema), controller.update);

module.exports = router;
