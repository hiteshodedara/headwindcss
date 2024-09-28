/**
 * Generates CSS classes for background colors based on the provided colors.
 * @param {Array} colors - An array of color objects.
 * @returns {string} - Generated CSS string for background colors.
 */
function generateBackgroundColorClasses(colors) {
  let css = '';
  
  colors.forEach(colorObj => {
      // Check if colorObj is a valid object and has entries
      if (typeof colorObj === 'object' && colorObj !== null && !Array.isArray(colorObj)) {
          const [name, value] = Object.entries(colorObj)[0]; // Get the name and value from each object
          css += `
              .bg-${name} { background-color: ${value}; }
          `;
      } else {
          console.warn(`Invalid background color entry in config: ${JSON.stringify(colorObj)}. Expected an object with a name-value pair.`);
      }
  });

  return css;
}

module.exports = generateBackgroundColorClasses;
