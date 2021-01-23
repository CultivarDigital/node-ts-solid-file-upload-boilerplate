export class FileUploadError extends Error {
  constructor() {
    super("Error trying tho upload the files");
    this.name = "FileUploadError";
  }
}
