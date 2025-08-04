import type { ApiClientRequestOptions } from "./api-client-types";

import axios from "axios";
import { isEmpty } from "lodash-es";

import { ApiError } from "./api-error";

export const defaultApiRequestAxios = axios.create({
  adapter: "fetch",
  validateStatus: () => true,
});

export async function defaultApiRequest(options: ApiClientRequestOptions) {
  const { baseUrl, url, method, headers, paramsQuery, paramsBody, axiosOptions } = options;

  const res = await defaultApiRequestAxios.request({
    baseURL: baseUrl,
    url,
    method,
    headers,
    data: isEmpty(paramsBody) ? undefined : paramsBody,
    params: paramsQuery,
    ...axiosOptions,
  });

  // 网络错误
  if (res.status !== 200) {
    throw new ApiError("接口网络错误", { res });
  }

  // 业务错误
  if (res.data.success === false) {
    throw new ApiError("接口业务错误", { res });
  }

  return res.data;
}
