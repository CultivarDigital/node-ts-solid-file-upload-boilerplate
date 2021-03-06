import faker from "faker";

import { UploadedFile } from "@/domain/models";

export class UploadedFilesBuilder {
  constructor(private uploadedFiles: UploadedFile[] = []) {}

  aListOfUploadedFiles(): UploadedFilesBuilder {
    this.uploadedFiles = [
      {
        name: faker.random.word(),
        path: faker.random.word(),
      },
      {
        name: faker.random.word(),
        path: faker.random.word(),
      },
    ];

    return this;
  }

  build(): UploadedFile[] {
    return this.uploadedFiles;
  }
}
