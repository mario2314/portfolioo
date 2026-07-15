const express = require('express');
const controller = require('../controllers/about.controller');
const { updateAboutSchema } = require('../validators/about.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.getOne);
router.put('/', requireAdmin, validate(updateAboutSchema), controller.update);

module.exports = router;
