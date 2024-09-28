/**
 * Generates CSS classes for text colors based on the provided color objects.
 * @param {Array} colors - An array of objects where keys are color names and values are color codes.
 * @returns {string} - Generated CSS string for text colors.
 */
function generateColorClasses(colors) {
  let css = '';
  
  colors.forEach(colorObj => {
    // Check if colorObj is a valid object and has entries
    if (typeof colorObj === 'object' && colorObj !== null && !Array.isArray(colorObj)) {
      const [name, value] = Object.entries(colorObj)[0]; // Get the name and value from each object
      css += `
          .text-${name} { color: ${value}; }
      `;
    } else {
      console.warn(`Invalid color entry in config: ${JSON.stringify(colorObj)}. Expected an object with a name-value pair.`);
    }
  });

  return css;
}


module.exports = generateColorClasses;
