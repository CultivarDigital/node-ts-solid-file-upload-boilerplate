import { File, UploadedFile } from "@/domain/models";
import { FileUploader } from "@/application/protocols";
import { UploadedFilesBuilder } from "@/__tests__/builders";

export class FileUploaderSpy implements FileUploader {
  private files = new UploadedFilesBuilder().aListOfUploadedFiles().build();

  async upload(
    _: File | File[]
  ): Promise<UploadedFile | UploadedFile[] | undefined> {
    return this.files;
  }
}
