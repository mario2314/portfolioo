const prisma = require('../config/db');
const { buildCrud } = require('../utils/crudFactory');

module.exports = buildCrud(prisma.skill, {
  searchFields: ['name'],
  orderBy: [{ category: 'asc' }, { order: 'asc' }],
});
