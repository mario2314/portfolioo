const axios = require('axios');
const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const config = require('../config/env');

// Cache sederhana di memory — GitHub API rate limit ketat (60/jam tanpa token),
// jadi hindari fetch ulang tiap kali section GitHub di-render.
let cache = { username: null, data: null, expiresAt: 0 };
const CACHE_TTL_MS = 10 * 60 * 1000;

const getStats = asyncHandler(async (req, res) => {
  const settings = await prisma.siteSettings.findFirst();
  const username = req.query.username || settings?.githubUsername || config.github.username;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Username GitHub belum diatur di Site Settings' });
  }

  if (cache.username === username && cache.expiresAt > Date.now()) {
    return res.json({ success: true, data: cache.data, cached: true });
  }

  const headers = config.github.token ? { Authorization: `Bearer ${config.github.token}` } : {};

  const [userRes, reposRes] = await Promise.all([
    axios.get(`https://api.github.com/users/${username}`, { headers }),
    axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
  ]);

  const repos = reposRes.data;
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const languageCounts = {};
  repos.forEach((r) => {
    if (r.language) languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
  });

  const data = {
    username: userRes.data.login,
    name: userRes.data.name,
    avatarUrl: userRes.data.avatar_url,
    bio: userRes.data.bio,
    publicRepos: userRes.data.public_repos,
    followers: userRes.data.followers,
    following: userRes.data.following,
    totalStars,
    topLanguages: Object.entries(languageCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([lang]) => lang),
    profileUrl: userRes.data.html_url,
  };

  cache = { username, data, expiresAt: Date.now() + CACHE_TTL_MS };
  res.json({ success: true, data, cached: false });
});

module.exports = { getStats };
