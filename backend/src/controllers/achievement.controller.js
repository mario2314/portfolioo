const prisma = require('../config/db');
const { buildCrud } = require('../utils/crudFactory');

module.exports = buildCrud(prisma.achievement, {
  searchFields: ['name', 'category'],
  orderBy: [{ date: 'desc' }],
});
