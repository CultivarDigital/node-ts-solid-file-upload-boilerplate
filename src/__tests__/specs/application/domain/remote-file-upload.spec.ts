import { RemoteFileUpload } from "@/application/usecases";
import { FileUploadError } from "@/domain/errors";
import { FileListBuilder, UploadedFilesBuilder } from "@/__tests__/builders";
import { FileUploaderSpy } from "@/__tests__/doubles/spies";

type Sut = {
  sut: RemoteFileUpload;
  fileUploader: FileUploaderSpy;
};

const sutFactory = (): Sut => {
  const fileUploader = new FileUploaderSpy();
  const sut = new RemoteFileUpload(fileUploader);
  return { sut, fileUploader };
};

const getFilesList = () => new FileListBuilder().aListOfFiles().build();

describe("RemoteFileUpload", () => {
  it("should return the list of the uploaded images", async () => {
    const { sut, fileUploader } = sutFactory();
    const uploadedFiles = new UploadedFilesBuilder()
      .aListOfUploadedFiles()
      .build();
    const uploadSpy = jest
      .spyOn(fileUploader, "upload")
      .mockResolvedValueOnce(uploadedFiles);
    const files = new FileListBuilder().aListOfFiles().build();
    const result = await sut.upload(files);
    expect(uploadSpy).toHaveBeenCalledWith(files);
    expect(result).toEqual(uploadedFiles);
  });
  it("should throw FileUploadError if FileUploader return falsy", async () => {
    const { sut, fileUploader } = sutFactory();
    jest.spyOn(fileUploader, "upload").mockResolvedValueOnce(undefined);
    const result = sut.upload(getFilesList());
    expect(result).rejects.toThrow(new FileUploadError());
  });
  it("should throw FileUploadError if FileUploader an empty array", async () => {
    const { sut, fileUploader } = sutFactory();
    jest.spyOn(fileUploader, "upload").mockResolvedValueOnce([]);
    const result = sut.upload(getFilesList());
    expect(result).rejects.toThrow(new FileUploadError());
  });
});
