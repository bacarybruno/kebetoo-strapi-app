'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate({ post }) {
      return strapi.services.lifecycles.posts.updateLastActive(post);
    },
    async afterUpdate({ post }) {
      return strapi.services.lifecycles.posts.updateLastActive(post);
    },
  },
};
