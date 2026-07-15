const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/env');

function generateAccessToken(admin) {
  return jwt.sign({ sub: admin.id, email: admin.email }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpires,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.jwt.accessSecret);
}

// Refresh token: random string disimpan di cookie httpOnly.
// Yang disimpan di DB hanya HASH-nya, bukan token asli — supaya kalau DB bocor,
// token yang beredar di cookie klien tetap tidak bisa dipakai ulang.
function generateRefreshTokenPlain() {
  return crypto.randomBytes(48).toString('hex');
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function refreshCookieOptions() {
  const isProd = config.nodeEnv === 'production';
  return {
    httpOnly: true,
    secure: isProd, // wajib true kalau sameSite 'none' (frontend & backend beda domain saat deploy)
    sameSite: isProd ? 'none' : 'lax',
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari, selaras dengan JWT_REFRESH_EXPIRES default
  };
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshTokenPlain,
  hashToken,
  refreshCookieOptions,
};
