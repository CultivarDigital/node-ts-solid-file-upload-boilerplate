import { HttpResponse, HttpStatusCode } from "@/infra/http";

export const ok = (data?: any): HttpResponse => ({
  statusCode: HttpStatusCode.ok,
  body: data,
});

export const serverError = (data?: any): HttpResponse => ({
  statusCode: HttpStatusCode.serverError,
  body: data,
});
