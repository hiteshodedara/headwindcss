/**
 * Generates responsive CSS classes based on breakpoints.
 * @param {Object} breakpoints - Breakpoints with screen sizes.
 * @param {Object} utilities - Utilities (margin, padding, etc.).
 * @param {Array} sizes - Available sizes.
 * @returns {string} - Generated CSS string for responsive utilities.
 */
function generateResponsiveClasses(breakpoints, utilities, sizes) {
    let css = '';
  
    Object.entries(breakpoints).forEach(([breakpoint, size]) => {
      css += `@media (min-width: ${size}) {`;
  
      Object.entries(utilities).forEach(([utilityName, utilityClasses]) => {
        utilityClasses.forEach(utility => {
          sizes.forEach(sizeValue => {
            const value = typeof sizeValue === 'object' ? Object.values(sizeValue)[0] : sizeValue;
            const escapedBreakpoint = breakpoint.replace(/^[0-9]/, '\\$&');
            const unit = !isNaN(value) && value !== '0' ? 'px' : '';
            css += `
              .${escapedBreakpoint}\\:${utility}-${value} { ${utilityName}: ${value}${unit}; }
            `;
          });
        });
      });
  
      css += `}`;
    });
  
    return css;
  }

module.exports = generateResponsiveClasses;