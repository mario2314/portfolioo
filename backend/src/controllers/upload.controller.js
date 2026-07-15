const asyncHandler = require('../utils/asyncHandler');

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Tidak ada file yang diupload' });
  }
  res.status(201).json({
    success: true,
    data: { url: req.file.path, publicId: req.file.filename },
  });
});

const uploadPdf = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Tidak ada file yang diupload' });
  }
  res.status(201).json({
    success: true,
    data: { url: req.file.path, publicId: req.file.filename },
  });
});

module.exports = { uploadImage, uploadPdf };
