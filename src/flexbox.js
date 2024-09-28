const flexboxClasses = require('./utilities/flexboxClasses');

/**
 * Generates CSS classes for Flexbox properties.
 * @returns {string} - Generated CSS string for Flexbox utilities.
 */
function generateFlexboxClasses() {
    let css = '';
    const classes = flexboxClasses();

    classes.forEach(({ class: className, property, value }) => {
        css += `
            .${className} { ${property}: ${value}; }
        `;
    });

    return css;
}

module.exports = generateFlexboxClasses;
