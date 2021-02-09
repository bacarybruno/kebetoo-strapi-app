module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      watch: false,
      instances: process.env.MAX_WORKERS || 'max',
    },
  ],
};