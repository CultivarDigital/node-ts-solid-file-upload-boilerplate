import { container } from "tsyringe";

import { AWSFileUploader } from "@/infra";
import { FileUploader } from "@/application/protocols";

container.registerSingleton<FileUploader>("FileUploader", AWSFileUploader);
