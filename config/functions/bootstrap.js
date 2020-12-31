'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/concepts/configurations.html#bootstrap
 */

const firebaseAdmin = require('firebase-admin');

module.exports = () => {
  // Check the number of initialized firebase apps
  // to avoid redeclaring the app
  if (firebaseAdmin.apps.length === 0) {
    try {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.applicationDefault(),
      }) 
    } catch (error) {
      console.log('An error occured while initializing the firebase app. Please check your firebase credentials.');
    }
  }
};
