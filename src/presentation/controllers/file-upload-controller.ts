import { injectable, inject } from "tsyringe";

import { File } from "@/domain/models";
import { FileUpload } from "@/domain/usecases";
import { HttpRequest, HttpResponse } from "@/infra/http";
import { ok, serverError } from "@/infra/http/responses";
import { Controller } from "@/presentation/protocols";

@injectable()
export class FileUploadController implements Controller {
  constructor(
    @inject("FileUpload")
    private readonly fileUpload: FileUpload
  ) {}

  async handle(request: HttpRequest<{ files: File[] }>): Promise<HttpResponse> {
    try {
      const { files } = request.body as { files: File[] };
      const filesPaths = await this.fileUpload.upload(files);

      return ok(filesPaths);
    } catch (error) {
      console.log("error", error);
      return serverError({ message: error.message });
    }
  }
}
