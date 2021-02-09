module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      watch: ['api', 'config'],
      instances: process.env.MAX_WORKERS || 2,
    },
  ],
};