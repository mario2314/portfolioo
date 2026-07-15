const prisma = require('../config/db');
const { buildSingleton } = require('../utils/singletonFactory');

module.exports = buildSingleton(prisma.hero);
