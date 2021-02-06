'use strict';

const getService = (name) => strapi.services[name];

const deleteContentType = (name) => (content) => getService(name).delete({ id: content.id });

const deleteContents = (contents, name) => {
  const deleteContent = deleteContentType(name);
  if (contents && contents.length > 0) {
    return contents.map(deleteContent);
  }
  return [];
};

const deleteAsset = async (asset) => {
  if (asset) {
    return strapi.plugins.upload.services.upload.remove(asset);
  }
  return Promise.resolve(null);
};

const deleteAssetFromProvider = async (asset) => {
  if (asset) {
    return strapi.plugins.upload.provider.delete(asset);
  }
  return Promise.resolve(null);
};

module.exports = {
  cleanup: {
    async comments(comments) {
      return Promise.all(deleteContents(comments, 'comments'));
    },
    async replies(replies) {
      return Promise.all(deleteContents(replies, 'comments'));
    },
    async reactions(reactions) {
      return Promise.all(deleteContents(reactions, 'reactions'));
    },
    async asset(asset) {
      return deleteAsset(asset);
    },
    async providerAsset(asset) {
      return deleteAssetFromProvider(asset);
    }
  },
  posts: {
    async updateLastActive(post) {
      return strapi.services.posts.updateLastActive(post);
    }
  },
};