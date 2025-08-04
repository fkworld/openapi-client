import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: false,
  typescript: true,
  ignores: ["**/generated/**"],
  imports: {
    overrides: {
      "perfectionist/sort-imports": [
        "error",
        {
          // copy-paste old options
          groups: [
            "type",
            ["parent-type", "sibling-type", "index-type", "internal-type"],
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "side-effect",
            "object",
            "unknown",
          ],
          order: "asc",
          type: "natural",
          // new options
          newlinesBetween: 1,
        },
      ],
    },
  },
});
