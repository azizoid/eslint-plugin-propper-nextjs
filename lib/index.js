const customPageRule = require("./rules/custom-page-rule");
const customUtilityRule = require("./rules/custom-utility-rule");

module.exports = {
  rules: {
    "custom-page-rule": customPageRule,
    "custom-utility-rule": customUtilityRule,
  },
  configs: {
    recommended: {
      rules: {
        "custom-rules/custom-page-rule": "error",
        "custom-rules/custom-utility-rule": "error",
      },
    },
  },
};