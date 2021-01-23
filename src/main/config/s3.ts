export const s3Config = {
  bucketName: String(process.env.AWS_S3_BUCKET),
  defaultRegion: String(process.env.DEFAULT_REGION),
  defaultFilesACL: String(process.env.DEFAULT_FILES_ACL),
};
