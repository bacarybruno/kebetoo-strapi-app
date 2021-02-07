'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      data.lastActive = new Date().toISOString();
    },
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