const { getFileType, getExpectedSuffix, isNextReservedFile } = require("../eslint-utils");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforces correct default export names and restricts default exports to Next.js reserved files.",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      incorrectName: "Default export must be named and must end with '{{expectedSuffix}}' for this file type.",
      noDefaultExport: "Default exports are forbidden except in Next.js reserved files. Use named exports instead.",
    },
  },
  create(context) {
    const filename = context.getFilename();
    const fileType = getFileType(filename);
    const expectedSuffix = getExpectedSuffix(fileType);
    const isReserved = isNextReservedFile(fileType);

    return {
      ExportDefaultDeclaration(node) {
        let exportName;

        // 🚨 Step 1: If file is not reserved, disallow default exports
        if (!isReserved) {
          context.report({
            node,
            messageId: "noDefaultExport",
            fix(fixer) {
              if (node.declaration.id) {
                return fixer.replaceText(
                  node,
                  `export const ${node.declaration.id.name} = ${context.getSourceCode().getText(node.declaration)};`
                );
              }
              return null;
            },
          });
          return;
        }

        // 🚨 Step 2: Ensure correct naming convention for reserved Next.js files
        if (expectedSuffix) {
          // Named function export (e.g., `export function Layout() {}`)
          if (node.declaration.type === "FunctionDeclaration" && node.declaration.id) {
            exportName = node.declaration.id.name;
          }

          // Named variable export (e.g., `export const Layout = () => {};`)
          if (
            node.declaration.type === "VariableDeclaration" &&
            node.declaration.kind === "const" &&
            node.declaration.declarations.length > 0
          ) {
            const declarator = node.declaration.declarations[0];
            if (declarator.id.type === "Identifier") {
              exportName = declarator.id.name;
            }
          }

          // Named Identifier export (e.g., `export default Layout;`)
          if (node.declaration.type === "Identifier") {
            const variableName = node.declaration.name;

            // Find the corresponding VariableDeclaration or FunctionDeclaration
            const scope = context.getScope();
            const variable = scope.set.get(variableName);

            if (variable && variable.defs.length > 0) {
              const def = variable.defs[0];

              if (def.node.type === "VariableDeclarator" && def.node.id.type === "Identifier") {
                exportName = def.node.id.name;
              } else if (def.node.type === "FunctionDeclaration" && def.node.id) {
                exportName = def.node.id.name;
              }
            }
          }

          // 🚨 Step 3: Enforce naming conventions
          if (!exportName) {
            context.report({
              node,
              message: `Default export must be named and should end with '${expectedSuffix}' for this file type.`,
            });
            return;
          }

          if (!exportName.endsWith(expectedSuffix)) {
            context.report({
              node,
              messageId: "incorrectName",
              data: { expectedSuffix },
            });
          }
        }
      },
    };
  },
};