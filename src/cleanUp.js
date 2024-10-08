const fs = require("fs");
const path = require("path");
const simpleStyleClean = require("./utilities/simpleStyleClean");
const filterMediaQueryCSS = require("./utilities/mediaQueryClean");
const prettier = require("prettier");


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

function separateUsedClasses(classes) {
  const classesWithColon = [];
  const classesWithoutColon = [];

  classes.forEach((cls) => {
    // Check if the class is not an empty string
    if (cls.trim() === '') {
      return; // Skip empty strings
    }
    
    if (cls.includes(":")) {
      classesWithColon.push(cls);
    } else {
      classesWithoutColon.push(cls);
    }
  });

  return { classesWithColon, classesWithoutColon };
}

function formatCSS(css) {
  return prettier.format(css, { parser: "css" });
}

// Function to filter unused CSS classes
async function filterUnusedCSSClasses(cssFilePath, usedClasses) {
  const { classesWithColon, classesWithoutColon } = separateUsedClasses(usedClasses);

  try {
      // Wait for both CSS processing functions to complete
      const finalCSS = await simpleStyleClean(cssFilePath, classesWithoutColon);
      const finalMediaQueryCSS = await filterMediaQueryCSS(cssFilePath, classesWithColon);

      // Combine the results
      const combinedCSS = `${finalCSS}\n${finalMediaQueryCSS}`;

      // Format the combined CSS
      const formattedCSS = formatCSS(combinedCSS);

      formattedCSS.then((data) => {
        fs.writeFileSync(cssFilePath, data, "utf8"); // Write formatted CSS
        console.log(`Updated ${cssFilePath} with combined CSS.`);
      });
  } catch (error) {
      // Handle any errors that occur during the process
      console.error(`Error updating CSS file: ${error.message}`);
  }
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
