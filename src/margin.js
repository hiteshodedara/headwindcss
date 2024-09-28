// margin.js

/**
 * Generates CSS classes for margins based on the provided sizes.
 * @param {Array} sizes - An array of size strings (e.g., '8px', '16px').
 * @returns {string} - Generated CSS string for margins.
 */
function generateMarginClasses(sizes) {
    let css = '';
    sizes.forEach(size => {
      css += `
        .mt-${size} { margin-top: ${size}; }
        .mb-${size} { margin-bottom: ${size}; }
        .ml-${size} { margin-left: ${size}; }
        .mr-${size} { margin-right: ${size}; }
        .mv-${size} { margin-top: ${size}; margin-bottom: ${size}; }
        .mh-${size} { margin-left: ${size}; margin-right: ${size}; }
        .ma-${size} { margin: ${size}; }
      `;
    });
    return css;
  }
  
  module.exports = generateMarginClasses;
  