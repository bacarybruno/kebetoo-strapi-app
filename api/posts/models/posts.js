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

const deleteAssetFromProvider = async (asset) => {
  if (asset) {
    return strapi.plugins.upload.provider.delete(asset);
  }
  return Promise.resolve(null);
};

module.exports = {
  lifecycles: {
    async afterDelete({ comments, reactions, image, audio, video }) {
      try {
        const { cleanup } = strapi.services.lifecycles;
        // delete comments
        await cleanup.comments(comments);
        // delete reactions
        await cleanup.reactions(reactions);
        // delete image
        await cleanup.asset(image);
        // delete audio
        await cleanup.asset(audio);
        // delete video
        if (video) {
          const videoPngThumbnail = {
            hash: `thumbnails/${video.hash}`,
            ext: '.png',
          };
          const videoGifThumbnail = {
            hash: `thumbnails/${video.hash}`,
            ext: '.gif',
          };
          await Promise.all([
            cleanup.asset(video),
            cleanup.providerAsset(videoPngThumbnail),
            cleanup.providerAsset(videoGifThumbnail)
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};