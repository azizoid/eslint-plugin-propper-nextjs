module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Ensure default exported const names match expected suffixes based on file type",
      category: "Best Practices",
      recommended: false,
    },
    schema: [],
    messages: {
      incorrectName: "Default export must be a constant, and its name must end with '{{expectedSuffix}}' for this file type.",
    },
  },
  create(context) {
    const filename = context.getFilename();
    let expectedSuffix;

    if (/page\.tsx$/.test(filename)) {
      expectedSuffix = "Page";
    } else if (/layout\.tsx$/.test(filename)) {
      expectedSuffix = "Layout";
    } else if (/template\.tsx$/.test(filename)) {
      expectedSuffix = "Template";
    } else {
      return {}; // Ignore other files
    }

    return {
      ExportDefaultDeclaration(node) {
        if (
          node.declaration.type !== "Identifier" &&
          !(node.declaration.type === "VariableDeclaration" && node.declaration.kind === "const")
        ) {
          context.report({
            node,
            message: `Default export must be a constant, and its name must end with '${expectedSuffix}' for this file type.`,
          });
          return;
        }

        let exportName;
        if (node.declaration.type === "Identifier") {
          exportName = node.declaration.name;
        } else if (
          node.declaration.type === "VariableDeclaration" &&
          node.declaration.declarations.length > 0
        ) {
          const declarator = node.declaration.declarations[0];
          if (declarator.id.type === "Identifier") {
            exportName = declarator.id.name;
          }
        }

        if (!exportName || !exportName.endsWith(expectedSuffix)) {
          context.report({
            node,
            messageId: "incorrectName",
            data: { expectedSuffix },
          });
        }
      },
    };
  },
}