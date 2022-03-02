import { S3 } from "aws-sdk";
import faker from "faker";

import { File } from "@/domain/models";
import { AWSFileUploader } from "@/infra";
import { FileListBuilder } from "@/__tests__/builders";

S3.prototype.putObject = jest.fn().mockImplementation(() => ({
  promise: () => Promise.resolve(),
}));

jest.mock("@/main/config/s3", () => ({
  s3Config: {
    bucketName: "aws-bucket",
    defaultRegion: "region",
    defaultFilesACL: "private",
  },
}));

const getFileKey = (file: File, timestamp: number) => {
  return `${file.name}-${timestamp}.${file.extension}`;
};

const mockDate = (): number => {
  const timestamp = faker.random.number();
  global.Date.now = jest.fn().mockReturnValueOnce(timestamp);
  return timestamp;
};

const sutFactory = (): AWSFileUploader => new AWSFileUploader();

describe("AWSFileUploader", () => {
  it("should call putObject for a single file", async () => {
    const sut = sutFactory();
    const putObjectSpy = jest.spyOn(S3.prototype, "putObject");
    const file = new FileListBuilder().aListOfFiles().build()[0];
    const timestamp = mockDate();
    await sut.upload(file);
    expect(putObjectSpy).toHaveBeenNthCalledWith(1, {
      Body: file.content,
      Bucket: "aws-bucket",
      ContentType: file.type,
      Key: `${file.name}-${timestamp}.${file.extension}`,
      ACL: "private",
    });
  });
  it("should return the uploaded file path", async () => {
    const sut = sutFactory();
    const file = new FileListBuilder().aListOfFiles().build()[0];
    const timestamp = mockDate();
    const result = await sut.upload(file);
    expect(result).toEqual({
      name: `${getFileKey(file, timestamp)}`,
      path: `aws-bucket/${getFileKey(file, timestamp)}`,
    });
  });
  it("should call putObject for a list of files", async () => {
    const sut = sutFactory();
    const putObjectSpy = jest.spyOn(S3.prototype, "putObject");
    const files = new FileListBuilder().aListOfFiles().build();
    const timestamps = [faker.random.number(), faker.random.number()];
    global.Date.now = jest
      .fn()
      .mockReturnValueOnce(timestamps[0])
      .mockReturnValueOnce(timestamps[1]);
    await sut.upload(files);
    expect(putObjectSpy).nthCalledWith(1, {
      Body: files[0].content,
      Bucket: "aws-bucket",
      ContentType: files[0].type,
      Key: `${files[0].name}-${timestamps[0]}.${files[0].extension}`,
      ACL: "private",
    });
    expect(putObjectSpy).nthCalledWith(2, {
      Body: files[1].content,
      Bucket: "aws-bucket",
      ContentType: files[1].type,
      Key: `${files[1].name}-${timestamps[1]}.${files[1].extension}`,
      ACL: "private",
    });
  });
  it("should return the uploaded files paths", async () => {
    const sut = sutFactory();
    const files = new FileListBuilder().aListOfFiles().build();
    const timestamps = [faker.random.number(), faker.random.number()];
    global.Date.now = jest
      .fn()
      .mockReturnValueOnce(timestamps[0])
      .mockReturnValueOnce(timestamps[1]);
    const result = await sut.upload(files);
    expect(result).toEqual([
      {
        name: `${getFileKey(files[0], timestamps[0])}`,
        path: `aws-bucket/${getFileKey(files[0], timestamps[0])}`,
      },
      {
        name: `${getFileKey(files[1], timestamps[1])}`,
        path: `aws-bucket/${getFileKey(files[1], timestamps[1])}`,
      },
    ]);
  });
  it("should return undefined if the upload fails", async () => {
    const sut = sutFactory();
    const file = new FileListBuilder().aListOfFiles().build()[0];
    const timestamp = mockDate();
    const putObjectSpy = jest
      .spyOn(S3.prototype, "putObject")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const result = await sut.upload(file);
    expect(result).toBeUndefined();
  });
});
