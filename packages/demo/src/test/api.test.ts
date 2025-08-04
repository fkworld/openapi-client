import { describe, expect, it } from "vitest";

import { apiPetStore } from "../service/api";

describe("apiPetStore", () => {
  it("should return response", async () => {
    const res = await apiPetStore.request("/pet/{petId} get", undefined, {
      paramsPath: {
        petId: 1,
      },
    });
    expect(res.id).toEqual(1);
  });
});
