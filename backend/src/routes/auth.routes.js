const express = require('express');
const { login, refresh, logout, me } = require('../controllers/auth.controller');
const { loginSchema } = require('../validators/auth.validator');
const { validate } = require('../middleware/validate');
const { requireAdmin } = require('../middleware/auth.middleware');
const { loginLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

router.post('/login', loginLimiter, validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', requireAdmin, me);

module.exports = router;
