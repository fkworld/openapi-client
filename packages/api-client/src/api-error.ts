import type { AxiosResponse } from "axios";

interface ApiErrorOptions {
  res: AxiosResponse<any, any>;
}

export class ApiError extends Error {
  constructor(message: string, options?: ApiErrorOptions) {
    super(message);
    this.options = options;
  }

  private options: ApiErrorOptions | undefined;

  get res() {
    return this.options?.res;
  }
}

export function getIsApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
