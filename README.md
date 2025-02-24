# eslint-plugin-propper-nextjs

## Overview
**eslint-plugin-propper-nextjs** is a custom ESLint plugin designed to enforce best practices for Next.js projects. It provides rules to ensure naming conventions for `page.tsx`, `layout.tsx`, `template.tsx`, and utility functions inside the `utilities/` folder.

## Installation

```sh
npm install --save-dev eslint-plugin-propper-nextjs
```

## Usage

### Enable the Plugin
Add `propper-nextjs` to your `.eslintrc.js`:

#### Option 1: Use Recommended Preset
```javascript
module.exports = {
  extends: ["plugin:propper-nextjs/recommended"],
};
```

#### Option 2: Manually Configure Rules
```javascript
module.exports = {
  plugins: ["propper-nextjs"],
  rules: {
    "propper-nextjs/custom-page-rule": "error",
    "propper-nextjs/custom-utility-rule": "error",
  },
};
```

## Rules

### `propper-nextjs/custom-page-rule`
- **Files**: Applies to `page.tsx`, `layout.tsx`, and `template.tsx`.
- **Enforces**:
  - Default export must be a `const`.
  - The variable name must match the file type:
    - `HomePage` → ✅ for `page.tsx`
    - `RootLayout` → ✅ for `layout.tsx`
    - `AuthTemplate` → ✅ for `template.tsx`

### `propper-nextjs/custom-utility-rule`
- **Files**: Applies to `utilities/*.ts`.
- **Enforces**:
  - The file must export a function with the same name as the filename.
  - Example:
    ```ts
    // checkUrl.ts
    export const checkUrl = () => {};
    ```

## Contributing
Pull requests are welcome! If you have ideas for new rules, feel free to open an issue.

## Author
Maintained by **Aziz Shahhuseynov**.

