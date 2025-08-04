import type {
  ApiKeys,
  ApiParamsBody,
  ApiParamsPath,
  ApiParamsQuery,
  ApiParamsQueryOrBody,
  ApiResponse,
  GetByPath,
} from "@fkworld/api-client";

import type { PetStoreApiDefines } from "../service/api";

import { describe, expectTypeOf, it } from "vitest";

describe("apiPetStore", () => {
  it("should return all api keys", () => {
    type Keys = ApiKeys<PetStoreApiDefines>;
    expectTypeOf<Keys>().toEqualTypeOf<
      | "/pet/{petId}/uploadImage post"
      | "/pet put"
      | "/pet post"
      | "/pet/findByStatus get"
      | "/pet/findByTags get"
      | "/pet/{petId} get"
      | "/pet/{petId} post"
      | "/pet/{petId} delete"
      | "/store/inventory get"
      | "/store/order post"
      | "/store/order/{orderId} get"
      | "/store/order/{orderId} delete"
      | "/user/createWithList post"
      | "/user/{username} get"
      | "/user/{username} put"
      | "/user/{username} delete"
      | "/user/login get"
      | "/user/logout get"
      | "/user/createWithArray post"
      | "/user post"
    >();
  });

  it("should return api params path", () => {
    type ParamsPath = ApiParamsPath<PetStoreApiDefines, "/pet/{petId} get">;
    expectTypeOf<ParamsPath>().toEqualTypeOf<{ petId: number }>();
  });

  it("should return api params query", () => {
    type ParamsQuery = ApiParamsQuery<PetStoreApiDefines, "/pet/findByStatus get">;
    expectTypeOf<ParamsQuery>().toEqualTypeOf<{ status: ("available" | "pending" | "sold")[] }>();

    type ParamsQueryOrBody = ApiParamsQueryOrBody<PetStoreApiDefines, "/pet/findByStatus get">;
    expectTypeOf<ParamsQueryOrBody>().toEqualTypeOf<{ status: ("available" | "pending" | "sold")[] }>();
  });

  it("should return api params body", () => {
    type ParamsBody = ApiParamsBody<PetStoreApiDefines, "/store/order post">;
    expectTypeOf<ParamsBody>().toEqualTypeOf<{
      id?: number;
      petId?: number;
      quantity?: number;
      shipDate?: string;
      status?: "placed" | "approved" | "delivered";
      complete?: boolean;
    }>();

    type ParamsQueryOrBody = ApiParamsQueryOrBody<PetStoreApiDefines, "/store/order post">;
    expectTypeOf<ParamsQueryOrBody>().toEqualTypeOf<{
      id?: number;
      petId?: number;
      quantity?: number;
      shipDate?: string;
      status?: "placed" | "approved" | "delivered";
      complete?: boolean;
    }>();
  });

  it("should return api response", () => {
    type Response = ApiResponse<PetStoreApiDefines, "/store/order/{orderId} get">;
    expectTypeOf<Response>().toEqualTypeOf<{
      id?: number;
      petId?: number;
      quantity?: number;
      shipDate?: string;
      status?: "placed" | "approved" | "delivered";
      complete?: boolean;
    }>();
  });
});

describe("GetByPath", () => {
  it("should return type", () => {
    type Res = GetByPath<ApiResponse<PetStoreApiDefines, "/pet/{petId} get">, "category.name">;
    expectTypeOf<Res>().toEqualTypeOf<string>();
  });
});
