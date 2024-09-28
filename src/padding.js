// padding.js

/**
 * Generates CSS classes for padding based on the provided sizes.
 * @param {Array} sizes - An array of size strings/numbers or objects.
 * @returns {string} - Generated CSS string for padding.
 */
function generatePaddingClasses(sizes) {
  let css = '';
  sizes.forEach(sizeObj => {
      // Check if the entry is an object
      if (typeof sizeObj === 'object' && sizeObj !== null) {
          const [name, size] = Object.entries(sizeObj)[0]; // Get the name and size from the object
          css += `
              .pt-${name} { padding-top: ${size}; }
              .pb-${name} { padding-bottom: ${size}; }
              .pl-${name} { padding-left: ${size}; }
              .pr-${name} { padding-right: ${size}; }
              .pv-${name} { padding-top: ${size}; padding-bottom: ${size}; }
              .ph-${name} { padding-left: ${size}; padding-right: ${size}; }
              .pa-${name} { padding: ${size}; }
          `;
      } else if (typeof sizeObj === 'string' || typeof sizeObj === 'number') {
          // Handle string or number sizes directly
          const name = sizeObj.toString().replace('px', '').replace('%', '').replace('rem', '').replace('vh', '').replace('vw', '');
          css += `
              .pt-${name} { padding-top: ${sizeObj}; }
              .pb-${name} { padding-bottom: ${sizeObj}; }
              .pl-${name} { padding-left: ${sizeObj}; }
              .pr-${name} { padding-right: ${sizeObj}; }
              .pv-${name} { padding-top: ${sizeObj}; padding-bottom: ${sizeObj}; }
              .ph-${name} { padding-left: ${sizeObj}; padding-right: ${sizeObj}; }
              .pa-${name} { padding: ${sizeObj}; }
          `;
      } else {
          console.warn(`Invalid padding entry: ${JSON.stringify(sizeObj)}. Expected an object, string, or number.`);
      }
  });
  return css;
}

module.exports = generatePaddingClasses;
