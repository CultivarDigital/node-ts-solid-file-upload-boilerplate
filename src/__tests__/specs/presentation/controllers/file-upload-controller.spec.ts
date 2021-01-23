import { ok, serverError } from "@/infra/http/responses";
import { FileUploadController } from "@/presentation/controllers";
import { FileListBuilder, UploadedFilesBuilder } from "@/__tests__/builders";
import { FileUploadSpy } from "@/__tests__/doubles/spies";

type Sut = {
  sut: FileUploadController;
  fileUpload: FileUploadSpy;
};

const sutFactory = (): Sut => {
  const fileUpload = new FileUploadSpy();
  const sut = new FileUploadController(fileUpload);
  return { sut, fileUpload };
};

const mockRequest = () => ({
  body: {
    files: new FileListBuilder().aListOfFiles().build(),
  },
});

describe("FileUploadController", () => {
  it("should call the FileUpload with the files present in the request body", async () => {
    const { sut, fileUpload } = sutFactory();
    const uploadSpy = jest.spyOn(fileUpload, "upload");
    const request = mockRequest();
    await sut.handle(request);
    expect(uploadSpy).toHaveBeenCalledWith(request.body.files);
  });
  it("should return the list of paths on success", async () => {
    const { sut, fileUpload } = sutFactory();
    const uploadedFiles = new UploadedFilesBuilder()
      .aListOfUploadedFiles()
      .build();
    jest.spyOn(fileUpload, "upload").mockResolvedValueOnce(uploadedFiles);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(uploadedFiles));
  });
  it("should return server error if FileUpload throws", async () => {
    const { sut, fileUpload } = sutFactory();
    const error = new Error("Internal error");
    jest.spyOn(fileUpload, "upload").mockRejectedValueOnce(error);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError({ message: error.message }));
  });
});
