import { container } from "tsyringe";

import { RemoteFileUpload } from "@/application/usecases";
import { FileUpload } from "@/domain/usecases";

container.registerSingleton<FileUpload>("FileUpload", RemoteFileUpload);
