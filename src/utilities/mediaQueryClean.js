const fs = require('fs');

/**
 * Extracts media query blocks from a CSS file that match the specified class names.
 *
 * @param {string} cssFilePath - Path to the CSS file.
 * @param {string[]} classNames - Array of used CSS class names to match.
 * @returns {string} - The extracted media query blocks as a formatted string.
 */
function filterMediaQueryCSS(cssFilePath, classNames) {
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');
    const mediaQueries = [];
    let currentMediaQuery = '';
    let insideMediaQuery = false;
    let openBracesCount = 0;

    // Read CSS file line by line
    const lines = cssContent.split('\n');

    // Step 1: Extract media queries
    for (let line of lines) {
        line = line.trim();  // Clean up leading/trailing spaces

        if (line.startsWith('@media')) {
            // Start of a new media query block
            if (insideMediaQuery) {
                mediaQueries.push(currentMediaQuery.trim());
            }
            insideMediaQuery = true;
            currentMediaQuery = line;  // Initialize the media query block
            openBracesCount = (line.match(/{/g) || []).length;  // Track opening braces
        } else if (insideMediaQuery) {
            // Add lines to the current media query block
            currentMediaQuery += `\n${line}`;
            openBracesCount += (line.match(/{/g) || []).length;
            openBracesCount -= (line.match(/}/g) || []).length;

            // If we've balanced the braces, close the current media query
            if (openBracesCount === 0) {
                mediaQueries.push(currentMediaQuery.trim());  // Trim the result
                insideMediaQuery = false;
                currentMediaQuery = '';  // Reset for the next media query
            }
        }
    }

    // Push the last media query if it's still open
    if (insideMediaQuery) {
        mediaQueries.push(currentMediaQuery.trim());
    }

    // Step 2: Find used class blocks in media queries
    const matchedBlocks = [];
    
    for (const query of mediaQueries) {
        const queryLines = query.split('\n');
        let currentBlock = '';  // To hold the current block content
        let mediaQueryHeader = queryLines[0].trim(); // Store the media query header
        let insideBlock = false;  // Track if we're inside a matching block

        // Loop through each line in the media query
        for (const line of queryLines) {
            const trimmedLine = line.trim(); // Clean up line spaces

            // Check if any class name from the input is in the current line
            for (const className of classNames) {
                const formattedClass = formatClassName(className);  // Format class name

                if (trimmedLine.startsWith(formattedClass)) {
                    // Add the media query header to matchedBlocks if not already added
                    if (!matchedBlocks.includes(mediaQueryHeader)) {
                        matchedBlocks.push(mediaQueryHeader); // Add the media query header
                    }

                    // Start building the current block
                    currentBlock += `\n${trimmedLine}`; // Append matched line
                    insideBlock = true; // We're inside a matching block
                    break; // No need to check other class names
                }
            }

            // If we're inside a block, add the line to the current block
            if (insideBlock) {
                // Include inner styles only if it's not a duplicate matched line
                if (!currentBlock.includes(trimmedLine) && !trimmedLine.endsWith('}')) {
                    currentBlock += `\n${trimmedLine}`; // Append to current block
                }
            }

            // If we've reached the end of the current block
            if (insideBlock && trimmedLine.endsWith('}')) {
                currentBlock += `\n${trimmedLine}`; // Add closing brace to the current block
                matchedBlocks.push(currentBlock.trim()); // Add the full current block
                insideBlock = false; // Reset the flag
                currentBlock = ''; // Reset current block
            }
        }

        // If we're still inside a block, adjust braces
        if (insideBlock) {
            matchedBlocks.push(currentBlock.trim()); // Push the current block without closing
        }
    }


    return formatMatchedBlocks(addClosingBraces(matchedBlocks))
}

const addClosingBraces = (rules) => {
    const output = [];
    let mediaQueryContent = [];
    
    rules.forEach(rule => {
      if (rule.includes('@media')) {
        // If there is existing content, close the previous media query
        if (mediaQueryContent.length) {
          output.push(mediaQueryContent.join('\n'));
          output.push('}');
          mediaQueryContent = []; // Reset for the next media query
        }
        output.push(rule); // Add the new media query
      } else {
        mediaQueryContent.push(rule); // Collect rules inside the media query
      }
    });
  
    // Close the last media query if there is content
    if (mediaQueryContent.length) {
      output.push(mediaQueryContent.join('\n'));
      output.push('}');
    }
  
    return output;
  };

// Function to format a class name like "md:m-1rem" to ".md\:m-1rem"
function formatClassName(className) {
    const [prefix, classPart] = className.split(':');
    return `.${prefix}\\:${classPart}`; // No curly braces here
}

// Function to convert matched blocks to a simple string format
function formatMatchedBlocks(matchedBlocks) {
    let result = '';
    for (let block of matchedBlocks) {
        result += block + '\n'; // Append each block and a new line
    }
    return result.trim(); // Trim to remove any trailing new lines
}

module.exports = filterMediaQueryCSS;
