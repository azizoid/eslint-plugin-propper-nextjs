module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow default exports except for Next.js reserved files (`page.tsx`, `layout.tsx`, `template.tsx`)",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      noDefaultExport:
        "Default exports are forbidden except in Next.js reserved files (page.tsx, layout.tsx, template.tsx). Use named exports instead.",
    },
  },

  create(context) {
    const filename = context.getFilename();

    // Allow default exports ONLY in Next.js reserved files
    const isNextReservedFile = /(page|layout|template)\.tsx?$/.test(filename);

    return {
      ExportDefaultDeclaration(node) {
        if (!isNextReservedFile) {
          context.report({
            node,
            messageId: "noDefaultExport",
            fix(fixer) {
              // Convert default export to named export
              if (node.declaration.id) {
                return fixer.replaceText(
                  node,
                  `export const ${node.declaration.id.name} = ${context.getSourceCode().getText(node.declaration)};`
                );
              }
              return null; // No fix if we cannot infer a variable name
            },
          });
        }
      },
    };
  },
};