// background.js

/**
 * Generates CSS classes for background colors based on the provided colors.
 * @param {Array} colors - An array of color strings.
 * @returns {string} - Generated CSS string for background colors.
 */
function generateBackgroundColorClasses(colors) {
    let css = '';
    colors.forEach(color => {
      // Remove '#' from the color for class naming
      const className = color.replace('#', 'hex-');
      css += `
        .bg-${className} { background-color: ${color}; }
      `;
    });
    return css;
  }
  
  module.exports = generateBackgroundColorClasses;
  