'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  count: async (ctx) => {
    const { uid } = ctx.params;
    
    let queryParams = {
      author: uid,
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
    }
  },
  findByUid: async (ctx) => {
    const { uid } = ctx.params;
    const { _from = null, _limit = 20, _sort = 'updatedAt:DESC' } = ctx.query;

    let queryParams = {
      _limit,
      author: uid,
      _sort,
      _where: [{ updatedAt_lt: _from }],
    };

    const [posts, comments, reactions] = await Promise.all([
      strapi.query('posts').find(queryParams),
      strapi.query('comments').find(queryParams),
      strapi.query('reactions').find(queryParams)
    ])

    const items = []
      .concat(...posts.map((post) => ({ type: 'post', data: post })))
      .concat(...comments.map((comment) => ({ type: 'comment', data: comment })))
      .concat(...reactions.map((reaction) => ({ type: 'reaction', data: reaction })))
      .sort((item1, item2) => new Date(item2.data.updatedAt).getTime() - new Date(item1.data.updatedAt).getTime())
      .slice(0, _limit);

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
  }
};
