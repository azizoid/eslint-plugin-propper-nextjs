# eslint-plugin-propper-nextjs

## Overview
**eslint-plugin-propper-nextjs** is a custom ESLint plugin designed to enforce best practices for Next.js projects.  
It ensures **correct default exports in Next.js reserved files**, **restricts default exports in other files**,  
and enforces **import and styling rules** for consistency.

---

## **Installation**
To install this plugin, run:

```sh
npm install --save-dev eslint-plugin-propper-nextjs eslint-plugin-import
```
or with pnpm:
```sh
pnpm install -D eslint-plugin-propper-nextjs eslint-plugin-import
```

### **Peer Dependencies**
This package requires **`eslint-plugin-import`** as a **peer dependency**. Make sure it is installed to avoid errors.

---

## **Usage**

### ✅ **For ESLint 9+ (Flat Config)**
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

### ✅ **For ESLint 8 and Below (`.eslintrc.js` format)**
If using legacy ESLint config, modify `.eslintrc.js`:

```javascript
module.exports = {
  plugins: ["propper-nextjs", "import"],
  extends: ["plugin:propper-nextjs/recommended"],
};
```

---

## **Rules Included**
### **Next.js Default Export Rules**
| **File Type**  | **Expected Default Export Name** |
|---------------|--------------------------------|
| `layout.tsx`  | `Layout` |
| `page.tsx`  | `Page` |
| `loading.tsx`  | `Loading` |
| `not-found.tsx`  | `NotFound` |
| `error.tsx`  | `Error` |
| `global-error.tsx`  | `GlobalError` |
| `template.tsx`  | `Template` |

✅ Ensures correct naming for **default exports in Next.js reserved files**.  
✅ **Prevents default exports in non-Next.js files** (e.g., inside `components/`, `lib/`).  
✅ Supports both **named functions** (`export function Page() {}`) and **arrow functions** (`export const Page = () => {}`).  
✅ **Auto-fixable**: Converts `export default function()` into `export const ComponentName = () => {};`.

---

### ** Import & Code Styling Rules**
| **Rule** | **Description** |
|----------|---------------|
| `"import/order"` | Enforces structured import grouping |
| `"import/no-duplicates"` | Prevents duplicate imports |
| `"import/no-cycle"` | Detects circular dependencies |
| `"import/no-extraneous-dependencies"` | Ensures only installed dependencies are imported |
| `"import/first"` | Ensures imports come before other statements |
| `"import/newline-after-import"` | Enforces a blank line after imports |
| `"no-console"` | Disallows `console.log` in production |
| `"quotes": ["error", "single"]` | Enforces single quotes for strings |
| `"no-trailing-spaces"` | Removes unnecessary spaces at the end of lines |
| `"prefer-const"` | Requires `const` for variables that are never reassigned |

---

## **Release Notes**
### **What's New in This Version?**
- ✅ **Merged Rules for Next.js Exports:** Now, one rule handles **both naming conventions & default export restrictions**.
- ✅ **Improved Plugin Registration:** Fully compatible with **ESLint 9+ Flat Config**.
- ✅ **Removed Utility File Rule:** No longer enforces utility function names.
- ✅ **Auto-Fix Enhancements:** ESLint can now fix default export violations more effectively.

---

## **How This Works**
1️⃣ **Ensures Next.js reserved files follow correct naming conventions.**  
2️⃣ **Prevents default exports in non-Next.js files (e.g., `components/`).**  
3️⃣ **Helps structure imports and maintain clean code.**  
4️⃣ **Auto-fixable to enforce best practices effortlessly.**  

---

## **Contributing**
Pull requests are welcome! If you have ideas for **new rules** or **improvements**, feel free to open an issue.

---

## ** Author**
Maintained by **Aziz Shahhuseynov**.
