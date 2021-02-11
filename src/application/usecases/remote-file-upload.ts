import { inject, injectable } from "tsyringe";

import { File, UploadedFile } from "@/domain/models";
import { FileUpload } from "@/domain/usecases";
import { FileUploader, DirectPublisher } from "@/application/protocols";
import { FileUploadError } from "@/domain/errors";

@injectable()
export class RemoteFileUpload implements FileUpload {
  constructor(
    @inject("FileUploader")
    private readonly fileUploader: FileUploader,
    @inject("DirectPublisher")
    private readonly directPublisher: DirectPublisher
  ) {}

  async upload(files: File[]): Promise<UploadedFile[]> {
    const uploadedFiles = await this.fileUploader.upload(files);

    if (!uploadedFiles) {
      throw new FileUploadError();
    }

    await this.directPublisher.publishDirect("files.uploaded", uploadedFiles);

    return uploadedFiles as UploadedFile[];
  }
}
