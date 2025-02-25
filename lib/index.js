const customPageRule = require("./rules/custom-page-rule");
const customUtilityRule = require("./rules/custom-utility-rule");

const propperNextJsPlugin = {
  rules: {
    "custom-page-rule": customPageRule,
    "custom-utility-rule": customUtilityRule,
  },
};

propperNextJsPlugin.configs = {
  recommended: {
    plugins: {
      "propper-nextjs": propperNextJsPlugin,
    },
    rules: {
      "propper-nextjs/custom-page-rule": "error",
      "propper-nextjs/custom-utility-rule": "error",
      // impoorts in all components will be grouped into readable structure
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
      "import/order": [
        "error",
        {
          groups: [
            "type",
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "@next/*", group: "internal", position: "before" },
            { pattern: "@/**", group: "internal" },
            { pattern: "*", group: "external", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
};

module.exports = propperNextJsPlugin