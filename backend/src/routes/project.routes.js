const express = require('express');
const controller = require('../controllers/project.controller');
const { createProjectSchema, updateProjectSchema } = require('../validators/project.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');
const { restrictPublic } = require('../utils/crudFactory');

const router = express.Router();

router.get('/', restrictPublic, controller.list);
router.get('/slug/:slug', restrictPublic, controller.getBySlug);

router.get('/admin/all', requireAdmin, controller.list);
router.get('/:id', requireAdmin, controller.getOne);
router.post('/', requireAdmin, validate(createProjectSchema), controller.create);
router.put('/:id', requireAdmin, validate(updateProjectSchema), controller.update);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
