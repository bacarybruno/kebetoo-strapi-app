'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  countActitivies: async (author) => {
    const queryParams = {
      author,
      _limit: -1,
    };

    const [posts, comments, reactions] = await Promise.all([
      strapi.query('posts').count(queryParams),
      strapi.query('comments').count(queryParams),
      strapi.query('reactions').count(queryParams)
    ])

    return {
      posts,
      comments,
      reactions,
    };
  },
  findAuthorActivities: async (author, from, sort, limit) => {
    const queryParams = {
      author,
      _where: [{ updatedAt_lt: from }],
      _sort: sort,
      _limit: limit,
    };

    const populatePost = {
      path: 'post', populate: { path: 'author' }
    };

    return Promise.all([
      strapi.query('posts').find(queryParams),
      strapi.query('comments').find(queryParams, [populatePost]),
      strapi.query('reactions').find(queryParams, [populatePost])
    ]);
  },
  findActivities: async (author, from = null, sort = 'updatedAt:DESC', limit = 20) => {
    const [posts, comments, reactions] = await strapi.services.authors.findAuthorActivities(author, from, sort, limit);

    const items = []
      .concat(posts.map((post) => ({ type: 'post', data: post })))
      .concat(comments.map((comment) => ({ type: 'comment', data: comment })))
      .concat(reactions.map((reaction) => ({ type: 'reaction', data: reaction })))
      .sort((item1, item2) => new Date(item2.data.updatedAt).getTime() - new Date(item1.data.updatedAt).getTime())
      .slice(0, limit);

    const count = {
      posts: items.filter((item) => item.type === 'post').length,
      comments: items.filter((item) => item.type === 'comment').length,
      reactions: items.filter((item) => item.type === 'reaction').length,
    }
    const metadata = {
      count: {
        ...count,
        pageSize: Object.values(count).reduce((acc, item) => acc + item, 0)
      },
      next: (items.slice(-1)[0] && items.slice(-1)[0].data.updatedAt) || null,
    };

    return {
      metadata,
      items,
    };
  },
};
