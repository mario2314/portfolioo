const prisma = require('../config/db');
const { buildCrud } = require('../utils/crudFactory');

module.exports = buildCrud(prisma.education, {
  searchFields: ['school', 'major'],
  orderBy: [{ startDate: 'desc' }],
});
