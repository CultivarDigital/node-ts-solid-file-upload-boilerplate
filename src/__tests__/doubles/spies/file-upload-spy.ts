import { File, UploadedFile } from "@/domain/models";
import { FileUpload } from "@/domain/usecases";
import { UploadedFilesBuilder } from "@/__tests__/builders";

export class FileUploadSpy implements FileUpload {
  async upload(_: File[]): Promise<UploadedFile[]> {
    return new UploadedFilesBuilder().aListOfUploadedFiles().build();
  }
}
