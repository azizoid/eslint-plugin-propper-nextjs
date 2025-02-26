module.exports = {
  /**
   * Extracts the base filename (without extension) from a given file path.
   * @param {string} filename - Full file path.
   * @returns {string|null} - The base filename or null if not found.
   */
  getFileType(filename) {
    const match = filename.match(/\/([^/]+)\.(js|jsx|ts|tsx)$/);
    return match ? match[1].toLowerCase() : null;
  },

  /**
   * Defines the expected suffix for Next.js reserved files.
   * @param {string} fileType - Base filename (e.g., "page", "layout").
   * @returns {string|null} - Expected suffix for the exported function name.
   */
  getExpectedSuffix(fileType) {
    const fileSuffixes = {
      "layout": "Layout",
      "page": "Page",
      "loading": "Loading",
      "not-found": "NotFound",
      "error": "Error",
      "global-error": "GlobalError",
      "template": "Template",
      "default": "DefaultFallback",
    };

    return fileSuffixes[fileType] || null;
  },

  /**
   * Checks if the file is a Next.js reserved file.
   * @param {string} fileType - Base filename (e.g., "page", "layout").
   * @returns {boolean} - True if the file is a Next.js reserved file.
   */
  isNextReservedFile(fileType) {
    return [
      "page", "layout", "template", "loading",
      "not-found", "error", "global-error"
    ].includes(fileType);
  },
};