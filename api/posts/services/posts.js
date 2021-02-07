'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async updateLastActive(post) {
    if (!post) return null

    const { model } = strapi.query('posts');
    const entry = await model.findOne({ _id: post._id });

    if (!entry) {
      const err = new Error('entry.notFound');
      err.status = 404;
      throw err;
    }

    // Update entry with no-relational data.
    await entry.updateOne({
      lastActive: new Date().toISOString(),
    }, {
      timestamps: false,
    });
  }
};
