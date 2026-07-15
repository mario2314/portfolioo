const express = require('express');
const { uploadImage, uploadPdf } = require('../controllers/upload.controller');
const { uploadImage: imageMiddleware, uploadPdf: pdfMiddleware } = require('../middleware/upload');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// field name di form-data harus "file"
router.post('/image', requireAdmin, imageMiddleware.single('file'), uploadImage);
router.post('/pdf', requireAdmin, pdfMiddleware.single('file'), uploadPdf);

module.exports = router;
