'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  countActivities: async (ctx) => {
    const { id } = ctx.params;
    return strapi.services.authors.countActitivies(id);
  },
  findActivities: async (ctx) => {
    const { id } = ctx.params;
    const { _from = null, _limit = 20, _sort = 'updatedAt:DESC' } = ctx.query;
    return strapi.services.authors.findActivities(id, _from, _sort, _limit);
  },
};
