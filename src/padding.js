// padding.js

/**
 * Generates CSS classes for padding based on the provided sizes.
 * @param {Array} sizes - An array of size strings (e.g., '8px', '16px').
 * @returns {string} - Generated CSS string for padding.
 */
function generatePaddingClasses(sizes) {
    let css = '';
    sizes.forEach(size => {
      css += `
        .pt-${size} { padding-top: ${size}; }
        .pb-${size} { padding-bottom: ${size}; }
        .pl-${size} { padding-left: ${size}; }
        .pr-${size} { padding-right: ${size}; }
        .pv-${size} { padding-top: ${size}; padding-bottom: ${size}; }
        .ph-${size} { padding-left: ${size}; padding-right: ${size}; }
        .pa-${size} { padding: ${size}; }
      `;
    });
    return css;
  }
  
  module.exports = generatePaddingClasses;
  