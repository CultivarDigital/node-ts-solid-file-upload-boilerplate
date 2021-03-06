import { S3 } from "aws-sdk";

import { FileUploader } from "@/application/protocols";
import { File, UploadedFile } from "@/domain/models";
import { s3Config } from "@/main/config/s3";

export class AWSFileUploader implements FileUploader {
  private client: S3;

  private readonly bucketName = s3Config.bucketName;

  constructor() {
    this.client = new S3({
      region: s3Config.defaultRegion,
    });
  }

  private generateFileKey(file: File, timestamp: number): string {
    return `${file.name}-${timestamp}.${file.extension}`;
  }

  private async uploadFile(file: File): Promise<UploadedFile> {
    const timestamp = Date.now();
    const fileKey = this.generateFileKey(file, timestamp);
    await this.client
      .putObject({
        Bucket: this.bucketName,
        Key: fileKey,
        ContentType: file.type,
        Body: file.content,
        ACL: s3Config.defaultFilesACL,
      })
      .promise();

    return {
      path: `${this.bucketName}/${fileKey}`,
      name: fileKey,
    };
  }

  async upload(
    files: File | File[]
  ): Promise<UploadedFile | UploadedFile[] | undefined> {
    try {
      if (Array.isArray(files)) {
        const uploadResult = await Promise.all(
          files.map(async (file) => this.uploadFile(file))
        );
        return uploadResult;
      }

      return await this.uploadFile(files);
    } catch {
      return undefined;
    }
  }
}
