# eslint-plugin-propper-nextjs

## Overview
**eslint-plugin-propper-nextjs** is a custom ESLint plugin designed to enforce best practices for Next.js projects. It provides rules to ensure naming conventions for `page.tsx`, `layout.tsx`, `template.tsx`, and utility functions inside the `utilities/` folder, along with import and styling rules.

## Installation

To install this plugin, run:

```sh
npm install --save-dev eslint-plugin-propper-nextjs eslint-plugin-import
```

or with pnpm:

```sh
pnpm install -D eslint-plugin-propper-nextjs eslint-plugin-import
```

### **Peer Dependencies**
This package requires **`eslint-plugin-import`** as a peer dependency. Make sure it is installed to avoid errors.

## Usage

### **Enable the Plugin in ESLint**

#### **For ESLint 9+ (Flat Config)**
Modify your `eslint.config.js`:

```javascript
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import propperNextJsPlugin from "eslint-plugin-propper-nextjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  propperNextJsPlugin.configs.recommended, // ✅ Enables all recommended rules
  {
    ignores: ["node_modules", ".next"],
  },
];

export default eslintConfig;
```

### **For ESLint 8 and Below (.eslintrc.js format)**
If using legacy ESLint config, modify `.eslintrc.js`:

```javascript
module.exports = {
  plugins: ["propper-nextjs", "import"],
  extends: ["plugin:propper-nextjs/recommended"],
};
```

## **Rules Included**
### **Custom Rules for Next.js**
- ✅ `"propper-nextjs/custom-page-rule"` – Enforces proper naming of default exports in `page.tsx`, `layout.tsx`, and `template.tsx`.
- ✅ `"propper-nextjs/custom-utility-rule"` – Ensures utility files export a function matching the filename.

### **Import and Code Styling Rules**
- ✅ `"import/order"` – Ensures readable and structured imports.
- ✅ `"import/no-duplicates"` – Prevents duplicate imports.
- ✅ `"import/no-cycle"` – Detects circular dependencies.
- ✅ `"import/no-extraneous-dependencies"` – Ensures only installed dependencies are imported.
- ✅ `"import/first"` – Ensures imports come before other statements.
- ✅ `"import/newline-after-import"` – Enforces a blank line after imports.
- ✅ `"no-console"` – Disallows console statements in production.
- ✅ `"quotes": ["error", "single"]` – Enforces single quotes for strings.
- ✅ `"no-trailing-spaces"` – Removes unnecessary spaces at the end of lines.
- ✅ `"prefer-const"` – Enforces `const` for variables that are not reassigned.

## Contributing
Pull requests are welcome! If you have ideas for new rules, feel free to open an issue.

## Author
Maintained by **Aziz Shahhuseynov**.

