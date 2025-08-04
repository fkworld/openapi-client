import type {
  ApiClientOptions,
  ApiClientRequestOptions,
  ApiKeys,
  ApiParamsBody,
  ApiParamsPath,
  ApiParamsQuery,
  ApiParamsQueryOrBody,
  ApiResponse,
} from "./api-client-types";

import { defaults, isEmpty, template } from "lodash-es";

import { defaultApiRequest } from "./api-request";

export class ApiClient<ApiDefines> {
  private clientOptions: ApiClientOptions;

  constructor(clientOptions: ApiClientOptions) {
    this.clientOptions = defaults(clientOptions, { request: defaultApiRequest });
  }

  async request<Key extends ApiKeys<ApiDefines>>(
    apiKey: Key,
    fastParams: ApiParamsQueryOrBody<ApiDefines, Key>,
    requestOptions?: ApiClientRequestOptions & {
      paramsPath?: ApiParamsPath<ApiDefines, Key>;
      paramsQuery?: ApiParamsQuery<ApiDefines, Key>;
      paramsBody?: ApiParamsBody<ApiDefines, Key>;
    },
  ): Promise<ApiResponse<ApiDefines, Key>> {
    const [sourceUrl, method] = apiKey.split(" ");
    const rewrittenUrl = this.clientOptions.rewriteUrl ? this.clientOptions.rewriteUrl(sourceUrl) : sourceUrl;
    const templatedUrl = !isEmpty(requestOptions?.paramsPath)
      ? template(rewrittenUrl, { interpolate: /\{(\w+)\}/g })(requestOptions?.paramsPath)
      : rewrittenUrl;

    const isFastParamsQuery = ["get", "head"].includes(method);

    const res = this.clientOptions.request?.({
      ...requestOptions,
      baseUrl: this.clientOptions.baseUrl,
      url: templatedUrl,
      method,
      headers: {
        ...this.clientOptions.headers,
        ...requestOptions?.headers,
      },
      paramsPath: {
        ...requestOptions?.paramsPath,
      },
      paramsQuery: {
        ...(isFastParamsQuery ? fastParams : {}),
        ...requestOptions?.paramsQuery,
      },
      paramsBody: {
        ...(!isFastParamsQuery ? fastParams : {}),
        ...requestOptions?.paramsBody,
      },
    });

    return res;
  }
}
