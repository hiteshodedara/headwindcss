// margin.js

/**
 * Generates CSS classes for margins based on the provided sizes.
 * @param {Array} sizes - An array of size strings/numbers or objects.
 * @returns {string} - Generated CSS string for margins.
 */
function generateMarginClasses(sizes) {
  let css = '';
  sizes.forEach(sizeObj => {
      // Check if the entry is an object
      if (typeof sizeObj === 'object' && sizeObj !== null) {
          const [name, size] = Object.entries(sizeObj)[0]; // Get the name and size from the object
          css += `
              .mt-${name} { margin-top: ${size}; }
              .mb-${name} { margin-bottom: ${size}; }
              .ml-${name} { margin-left: ${size}; }
              .mr-${name} { margin-right: ${size}; }
              .mv-${name} { margin-top: ${size}; margin-bottom: ${size}; }
              .mh-${name} { margin-left: ${size}; margin-right: ${size}; }
              .ma-${name} { margin: ${size}; }
          `;
      } else if (typeof sizeObj === 'string' || typeof sizeObj === 'number') {
          // Handle string or number sizes directly
          const name = sizeObj.toString().replace('px', '').replace('%', 'pr');
          css += `
              .mt-${name} { margin-top: ${sizeObj}; }
              .mb-${name} { margin-bottom: ${sizeObj}; }
              .ml-${name} { margin-left: ${sizeObj}; }
              .mr-${name} { margin-right: ${sizeObj}; }
              .mv-${name} { margin-top: ${sizeObj}; margin-bottom: ${sizeObj}; }
              .mh-${name} { margin-left: ${sizeObj}; margin-right: ${sizeObj}; }
              .ma-${name} { margin: ${sizeObj}; }
          `;
      } else {
          console.warn(`Invalid margin entry: ${JSON.stringify(sizeObj)}. Expected an object, string, or number.`);
      }
  });
  return css;
}

module.exports = generateMarginClasses;
