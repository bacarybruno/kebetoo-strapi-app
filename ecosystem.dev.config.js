module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      watch: ['api', 'config'],
      instances: 2,
    },
  ],
};