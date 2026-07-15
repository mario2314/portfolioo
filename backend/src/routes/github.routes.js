const express = require('express');
const { getStats } = require('../controllers/github.controller');

const router = express.Router();

router.get('/stats', getStats);

module.exports = router;
