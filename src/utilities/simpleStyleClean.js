const fs = require('fs');

function simpleStyleClean(cssFilePath, usedClasses) {
    const cssContent = fs.readFileSync(cssFilePath, "utf8");

    // Regular expression to match entire CSS rules including their properties
    const cssRuleRegex = /\.([a-zA-Z0-9-_]+)\s*{([^}]*)}/g;

    // Create a set for used classes for faster lookups
    const usedClassesSet = new Set(usedClasses);

    // Initialize an array to hold filtered CSS
    const filteredCSS = [];
    let match;

    // Loop through all matched CSS rules
    while ((match = cssRuleRegex.exec(cssContent)) !== null) {
        const className = match[1]; // Get the class name from the match

        // Check if the class is used
        if (usedClassesSet.has(className)) {
            // If the class is used, keep the entire rule
            filteredCSS.push(match[0]);
        }
    }

    // Join the filtered CSS rules
    const finalCSS = filteredCSS.join("\n").trim(); // Joining with new lines for better formatting

    // Return the final CSS instead of writing to a file
    return finalCSS;
}

module.exports = simpleStyleClean;