'use strict';

/**
 * `isAuthenticated` policy.
 */

module.exports = async (ctx, next) => {
  // decode firebase tokens
  try {
    if (ctx.state.user || ctx.state.admin) {
      // request is already authenticated in a different way (eg. docs)
      return next();
    }
    ctx.state.user = await strapi.services.auth.getToken(ctx);
    // Go to next policy or will reach the controller's action.
    return await next();
  } catch (error) {
    ctx.unauthorized(error.message || error);
  }
};
