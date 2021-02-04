'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

const deleteAsset = async (asset) => {
  if (asset) {
    return strapi.plugins.upload.services.upload.remove(asset);
  }
  return Promise.resolve(null);
};

module.exports = {
  lifecycles: {
    async afterDelete({ image }) {
      try {
        // delete image
        await deleteAsset(image);
      } catch (error) {
        console.log(error);
      }
    },
  },
};