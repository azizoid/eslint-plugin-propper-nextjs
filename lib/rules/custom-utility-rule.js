module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Ensure files in the utilities folder export a function matching the filename",
      category: "Best Practices",
      recommended: false,
    },
    schema: [],
    messages: {
      incorrectExport: "File '{{filename}}' must export a function named '{{expectedExport}}'.",
    },
  },
  create(context) {
    const filename = context.getFilename();
    const match = filename.match(/\/utilities\/(\w+)\.ts$/);
    if (!match) {
      return {}; // Only target files inside the utilities folder ending with .ts
    }

    const expectedExport = match[1];
    let hasCorrectExport = false;

    return {
      ExportNamedDeclaration(node) {
        if (
          node.declaration &&
          node.declaration.type === "VariableDeclaration" &&
          node.declaration.kind === "const"
        ) {
          const declarator = node.declaration.declarations[0];
          if (declarator.id.type === "Identifier" && declarator.id.name === expectedExport) {
            hasCorrectExport = true;
          }
        }
      },
      'Program:exit'() {
        if (!hasCorrectExport) {
          context.report({
            loc: { line: 1, column: 0 },
            messageId: "incorrectExport",
            data: { filename: match[1], expectedExport },
          });
        }
      }
    };
  },
};
