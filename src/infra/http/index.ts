export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  serverError = 500,
}

export type HttpRequest<T = any> = {
  body?: T;
};

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
