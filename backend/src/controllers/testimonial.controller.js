const prisma = require('../config/db');
const { buildCrud } = require('../utils/crudFactory');

module.exports = buildCrud(prisma.testimonial, {
  searchFields: ['name', 'company'],
  orderBy: [{ order: 'asc' }],
});
