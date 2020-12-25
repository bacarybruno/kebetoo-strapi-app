module.exports = ({ env }) => ({
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      region: env('AWS_REGION'),
      s3ForcePathStyle: true,
      endpoint: new URL(env('AWS_S3_ENDPOINT')),
      params: {
        Bucket: env('AWS_BUCKET'),
      },
    },
  },
})