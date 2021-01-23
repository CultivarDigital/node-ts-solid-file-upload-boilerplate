import { File, UploadedFile } from "@/domain/models";

export interface FileUpload {
  upload: (files: File[]) => Promise<UploadedFile[]>;
}
