const { verifyAccessToken } = require('../services/token.service');

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token tidak ditemukan' });
  }

  try {
    const payload = verifyAccessToken(token);
    req.admin = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token tidak valid atau kedaluwarsa' });
  }
}

module.exports = { requireAdmin };
