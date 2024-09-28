// color.js

/**
 * Generates CSS classes for text colors based on the provided colors.
 * @param {Array} colors - An array of color strings.
 * @returns {string} - Generated CSS string for text colors.
 */
function generateColorClasses(colors) {
    let css = '';
    colors.forEach(color => {
      // Remove '#' from the color for class naming
      const className = color.replace('#', 'hex-');
      css += `
        .text-${className} { color: ${color}; }
      `;
    });
    return css;
  }
  
  module.exports = generateColorClasses;
  