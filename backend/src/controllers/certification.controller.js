const prisma = require('../config/db');
const { buildCrud } = require('../utils/crudFactory');

module.exports = buildCrud(prisma.certification, {
  searchFields: ['name', 'issuer'],
  orderBy: [{ date: 'desc' }],
});
