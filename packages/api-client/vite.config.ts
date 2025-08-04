import { defineConfig } from "vitest/config";

import { VITEST_CONFIG } from "../../shared/vitest-config";

export default defineConfig({
  test: VITEST_CONFIG,
});
