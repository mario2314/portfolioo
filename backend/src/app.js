const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const config = require('./config/env');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security & parsing
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiter global (limiter khusus login akan ditambahkan di Tahap 5)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

// Sitemap dinamis — di luar prefix /api karena secara konvensi sitemap.xml
// diakses langsung dari root domain
app.get('/sitemap.xml', require('./controllers/sitemap.controller').getSitemap);

// === Routes ===
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/hero', require('./routes/hero.routes'));
app.use('/api/about', require('./routes/about.routes'));
app.use('/api/settings', require('./routes/settings.routes'));
app.use('/api/skills', require('./routes/skill.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/experience', require('./routes/experience.routes'));
app.use('/api/education', require('./routes/education.routes'));
app.use('/api/certifications', require('./routes/certification.routes'));
app.use('/api/achievements', require('./routes/achievement.routes'));
app.use('/api/blog', require('./routes/blog.routes'));
app.use('/api/testimonials', require('./routes/testimonial.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/github', require('./routes/github.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
