export interface IRequest {
  body: Record<string, any>;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IControler {
  handle(request: IRequest): Promise<IResponse>;
}
