export interface IRequest {
  body: Record<string, any>;
  params: Record<string, string>;
  headers: Record<string, string>;
  query?: Record<string, any>;
  account?: {
    id: string;
    role: string;
  };
}
