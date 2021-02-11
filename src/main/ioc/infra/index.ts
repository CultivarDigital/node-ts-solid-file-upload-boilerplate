import { container } from "tsyringe";

import { AWSFileUploader, AMQPAdapter } from "@/infra";
import { DirectPublisher, FileUploader } from "@/application/protocols";

container.registerSingleton<FileUploader>("FileUploader", AWSFileUploader);
container.registerSingleton<DirectPublisher>("DirectPublisher", AMQPAdapter);
