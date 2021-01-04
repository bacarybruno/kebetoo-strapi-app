'use strict';

const firebaseAdmin = require('firebase-admin');

module.exports = {
  getToken: async (ctx) => {
    const headerToken = ctx.request && ctx.request.header && ctx.request.header.authorization;
    if (headerToken) {
      try {
        const idToken = headerToken.replace('Bearer', '').trim();
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        return { ...decodedToken };
      } catch (error) {
        throw new Error('The specified token is invalid.');
      }
    }
    console.log(ctx);
    throw new Error('Missing authorization in header.');
  },
};