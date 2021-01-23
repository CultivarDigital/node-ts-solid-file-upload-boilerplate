import { HttpRequest, HttpResponse } from "@/infra/http";

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>;
}
