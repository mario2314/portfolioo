const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Gambar: masuk folder portfolio/images, auto-optimize, batasi 5MB
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

// PDF (untuk CV): masuk folder terpisah, resource_type raw karena bukan gambar
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio/documents',
    allowed_formats: ['pdf'],
    resource_type: 'raw',
  },
});

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadPdf = multer({
  storage: pdfStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = { uploadImage, uploadPdf };
