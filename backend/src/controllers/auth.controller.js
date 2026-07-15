const bcrypt = require('bcryptjs');
const prisma = require('../config/db');
const config = require('../config/env');
const {
  generateAccessToken,
  generateRefreshTokenPlain,
  hashToken,
  refreshCookieOptions,
} = require('../services/token.service');

const REFRESH_COOKIE_NAME = 'refreshToken';

function refreshExpiryDate() {
  // JWT_REFRESH_EXPIRES default '7d' — di sini dihitung manual dalam ms untuk kolom expiresAt di DB
  const days = 7;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

async function issueTokensForAdmin(admin, res) {
  const accessToken = generateAccessToken(admin);
  const refreshPlain = generateRefreshTokenPlain();

  await prisma.refreshToken.create({
    data: {
      tokenHash: hashToken(refreshPlain),
      adminId: admin.id,
      expiresAt: refreshExpiryDate(),
    },
  });

  res.cookie(REFRESH_COOKIE_NAME, refreshPlain, refreshCookieOptions());
  return accessToken;
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    // Pesan error digeneralisir sengaja — supaya tidak bocor apakah email terdaftar atau tidak
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const accessToken = await issueTokensForAdmin(admin, res);

    res.json({
      success: true,
      data: { accessToken, admin: { id: admin.id, email: admin.email } },
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Refresh token tidak ditemukan' });
    }

    const tokenHash = hashToken(token);
    const stored = await prisma.refreshToken.findUnique({ where: { tokenHash } });

    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/auth' });
      return res.status(401).json({ success: false, message: 'Sesi berakhir, silakan login ulang' });
    }

    // Rotasi: token lama langsung direvoke, token baru diterbitkan.
    // Kalau token lama dipakai lagi setelah ini (indikasi dicuri), otomatis ditolak.
    await prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });

    const admin = await prisma.admin.findUnique({ where: { id: stored.adminId } });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Akun tidak ditemukan' });
    }

    const accessToken = await issueTokensForAdmin(admin, res);
    res.json({ success: true, data: { accessToken } });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];
    if (token) {
      const tokenHash = hashToken(token);
      await prisma.refreshToken.updateMany({
        where: { tokenHash },
        data: { revoked: true },
      });
    }
    res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/auth' });
    res.json({ success: true, message: 'Berhasil logout' });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin tidak ditemukan' });
    }
    res.json({ success: true, data: { id: admin.id, email: admin.email } });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, refresh, logout, me };
