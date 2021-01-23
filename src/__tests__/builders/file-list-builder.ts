import faker from "faker";

import { File } from "@/domain/models";

export class FileListBuilder {
  constructor(private files: File[] = []) {}

  aListOfFiles(): FileListBuilder {
    this.files = [
      {
        name: faker.random.word(),
        size: faker.random.number(),
        type: "image/jpeg",
        extension: "jpg",
        content: Buffer.from(faker.image.image()),
      },
      {
        name: faker.random.word(),
        size: faker.random.number(),
        type: "image/jpeg",
        extension: "jpg",
        content: Buffer.from(faker.image.cats()),
      },
    ];

    return this;
  }

  build(): File[] {
    return this.files;
  }
}
