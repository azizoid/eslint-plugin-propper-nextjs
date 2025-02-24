const customPageRule = require("./rules/custom-page-rule");


module.exports = {
  rules: {
    "custom-page-rule": customPageRule,

  },
  configs: {
    recommended: {
      rules: {
        "custom-rules/custom-page-rule": "error",

      },
    },
  },
};