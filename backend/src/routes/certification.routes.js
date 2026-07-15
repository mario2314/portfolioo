const express = require('express');
const controller = require('../controllers/certification.controller');
const { createCertificationSchema, updateCertificationSchema } = require('../validators/certification.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', requireAdmin, validate(createCertificationSchema), controller.create);
router.put('/:id', requireAdmin, validate(updateCertificationSchema), controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
