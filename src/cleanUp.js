const fs = require("fs");
const path = require("path");

// Function to scan files for used CSS classes
function scanForUsedClasses(dir) {
  const usedClasses = new Set();

  // Function to read a directory and scan files
  function readDirectory(directory) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readDirectory(filePath); // Recursively read directories
      } else if (/\.(html|jsx|js|tsx|ts)$/i.test(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        
        // Match class or className attributes
        const classMatches = content.match(/class(?:Name)?=["']([^"']*)["']/g);
        if (classMatches) {
          classMatches.forEach((match) => {
            const classes = match.match(/["']([^"']*)["']/)[1].split(/\s+/);
            classes.forEach((cls) => usedClasses.add(cls));
          });
        }

        // Match tailwind utility classes in template literals
        const templateLiteralMatches = content.match(/`[^`]*`/g);
        if (templateLiteralMatches) {
          templateLiteralMatches.forEach((match) => {
            const classes = match.match(/\b[a-zA-Z0-9-]+(?:-[a-zA-Z0-9-]+)*\b/g);
            if (classes) {
              classes.forEach((cls) => usedClasses.add(cls));
            }
          });
        }
      }
    });
  }

  readDirectory(dir);
  return Array.from(usedClasses);
}

// Function to filter unused CSS classes
function filterUnusedCSSClasses(cssFilePath, usedClasses) {
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

    // Write the filtered CSS back to the file
    fs.writeFileSync(cssFilePath, finalCSS, "utf8");
    console.log(`Updated ${cssFilePath} by removing unused CSS classes.`);
}




// Main function to clean up unused CSS
async function cleanUnusedCSS(userProjectPath) {
  const config = readConfigFile(); // Read the config to get the style filename and directory
  const styleDir = path.join(process.cwd(), config.styleDirname);
  const cssFilePath = path.join(styleDir, config.styleFilename);

  // Step 1: Scan for used classes in the specified user project path
  const usedClasses = scanForUsedClasses(userProjectPath);
  
  // Log the classes that are found
//   console.log(`Used classes found: ${Array.from(usedClasses).join(", ")}`);

  // Step 2: Filter out unused classes from the CSS file
  filterUnusedCSSClasses(cssFilePath, usedClasses);
}

// Function to read the configuration from the file
function readConfigFile() {
  const configFileName = "headwind.config.json"; // Default config file name
  const defaultConfig = {
    styleDirname: "dist",
    styleFilename: "style.css",
    userProjectPath: "", // Default project path is empty
  };

  if (fs.existsSync(configFileName)) {
    const configData = fs.readFileSync(configFileName, "utf8");
    return JSON.parse(configData);
  } else {
    console.log(
      `${configFileName} does not exist. Using default configuration.`
    );
    return defaultConfig;
  }
}

// Export the cleanup function
module.exports = {
  cleanUnusedCSS,
};

// Example usage:
// cleanUnusedCSS('/path/to/your/project').catch(console.error);
