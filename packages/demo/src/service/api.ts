import type { paths as PetStoreApiDefines } from "../generated/apis/api-pet-store";

import { ApiClient } from "@fkworld/api-client";

export type { PetStoreApiDefines };

export const apiPetStore = new ApiClient<PetStoreApiDefines>({
  baseUrl: "https://petstore.swagger.io/v2/",
});
