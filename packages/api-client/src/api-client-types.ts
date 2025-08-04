import type { AxiosRequestConfig } from "axios";
import type { Get, Paths, Split } from "type-fest";

export interface ApiClientOptions {
  request?: (options: ApiClientRequestOptions) => Promise<any>;
  rewriteUrl?: (oldUrl: string) => string;
  baseUrl?: string;
  headers?: Record<string, any>;
}

export interface ApiClientRequestOptions {
  baseUrl?: string;
  url?: string;
  method?: string;
  headers?: Record<string, any>;
  paramsPath?: Record<string, any>;
  paramsQuery?: Record<string, any>;
  paramsBody?: Record<string, any>;
  axiosOptions?: AxiosRequestConfig;
}

/**
 * 根据接口类型生成 api keys 类型
 */
export type ApiKeys<ApiDefines> = {
  [Path in keyof ApiDefines]: {
    [Method in keyof ApiDefines[Path]]: `${Path & string} ${Method & string}`;
  }[keyof ApiDefines[Path]];
}[keyof ApiDefines];

/**
 * 获取某个接口的 path 参数类型
 */
export type ApiParamsPath<ApiDefines, Key extends ApiKeys<ApiDefines>> = Get<
  ApiDefines,
  [...Split<Key, " ">, "parameters", "path"]
>;

/**
 * 获取某个接口的 query 参数类型
 */
export type ApiParamsQuery<ApiDefines, Key extends ApiKeys<ApiDefines>> = Get<
  ApiDefines,
  [...Split<Key, " ">, "parameters", "query"]
>;

/**
 * 获取某个接口的 body 参数类型
 */
export type ApiParamsBody<ApiDefines, Key extends ApiKeys<ApiDefines>> = Get<
  ApiDefines,
  [...Split<Key, " ">, "parameters", "body", "body"]
>;

/**
 * - 如果是 get/head 方法，则返回 ApiParamsQuery<ApiDefines, Key>
 * - 如果是其他方法，则返回 ApiParamsBody<ApiDefines, Key>
 */
export type ApiParamsQueryOrBody<ApiDefines, Key extends ApiKeys<ApiDefines>> = Split<Key, " ">[1] extends
  | "get"
  | "head"
  ? ApiParamsQuery<ApiDefines, Key>
  : ApiParamsBody<ApiDefines, Key>;

/**
 * 获取某个接口的返回值类型
 */
export type ApiResponse<ApiDefines, Key extends ApiKeys<ApiDefines>> = Get<
  ApiDefines,
  [...Split<Key, " ">, "responses", "200", "schema"]
>;

/**
 * 安全的获取接口里的类型
 *
 * - 注意：maxRecursionDepth = 5
 *
 * @example
 * ```ts
 * type Res = GetByPath<ApiResponse<PetStoreApiDefines, "/pet/{petId} get">, "category.name">;
 * ```
 */
export type GetByPath<T, Path extends Paths<T, { maxRecursionDepth: 5 }>> = NonNullable<
  Get<
    T,
    // @ts-expect-error Path 类型异常
    Path
  >
>;
