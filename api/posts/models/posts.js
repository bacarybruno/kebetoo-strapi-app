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
        // delete comments
        await Promise.all(deleteContents(comments, 'comments'));
        // delete reactions
        await Promise.all(deleteContents(reactions, 'reactions'));
        // delete images
        await deleteAsset(image);
        // delete audio
        await deleteAsset(audio);
        // delete video
        await deleteAsset(video);
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
            deleteAsset(video),
            deleteAssetFromProvider(videoPngThumbnail),
            deleteAssetFromProvider(videoGifThumbnail)
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};