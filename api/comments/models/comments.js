'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

const deleteContent = (name) => (content) => strapi.services[name].delete({ id: content.id });

const deleteContents = (contents, name) => {
  if (contents && contents.length > 0) {
    return contents.map(deleteContent(name))
  }
  return []
};

const deleteAsset = async (asset) => {
  if (asset) {
    return strapi.plugins.upload.services.upload.remove(asset);
  }
  return Promise.resolve(null);
};

module.exports = {
  lifecycles: {
    async afterDelete({ replies, reactions, audio }) {
      try {
        // delete replies
        await Promise.all(deleteContents(replies, 'comments'));
        // delete reactions
        await Promise.all(deleteContents(reactions, 'reactions'));
        // delete audio
        await deleteAsset(audio);
      } catch (error) {
        console.log(error);
      }
    },
  },
};