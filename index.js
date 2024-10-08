#!/usr/bin/env node
const fs = require("fs");

const { cleanUnusedCSS } = require("./src/cleanUp");
const createUtilityClasses = require("./scripts/createUtilityClasses");
const defaultConfig = require("./default.config");

const configFileName = "headwind.config.json"; // Default config file name


// Function to create a default config file
function createConfigFile() {
  if (!fs.existsSync(configFileName)) {
    fs.writeFileSync(
      configFileName,
      JSON.stringify(defaultConfig, null, 2),
      "utf8"
    );
    console.log(`${configFileName} created with default settings.`);
  } else {
    console.log(`${configFileName} already exists.`);
  }
}

// Function to read the configuration from the file
function readConfigFile() {
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

// Function to minify CSS

// Function to format CSS using Prettier


// Function to create utility classes
// async function createUtilityClasses(config = {}) {
//   const finalConfig = { ...defaultConfig, ...config };
//   let css = "";

//   // Generate CSS classes based on the final configuration
//   if (finalConfig.MarginGeneration) {
//     css += await generateMarginClasses(finalConfig.sizes);
//   }
//   if (finalConfig.PaddingGeneration) {
//     css += await generatePaddingClasses(finalConfig.sizes);
//   }
//   if (finalConfig.ColorGeneration) {
//     css += await generateColorClasses(finalConfig.colors);
//   }
//   if (finalConfig.BackgroundGeneration) {
//     css += await generateBackgroundColorClasses(finalConfig.colors);
//   }

//   if (finalConfig.FlexboxGeneration) { // Check if Flexbox generation is enabled
//     css += await generateFlexboxClasses(); // Generate Flexbox classes
//   }

//   // Ensure that CSS is generated before proceeding
//   if (css) {
//     const minifiedCSS = minifyCSS(css); // Minify the generated CSS
//     const formattedCSS = formatCSS(minifiedCSS); // Format the minified CSS
//     const outputDir = path.join(process.cwd(), finalConfig.styleDirname);
//     const outputPath = path.join(outputDir, finalConfig.styleFilename);

//     // Ensure the 'dist' directory exists
//     if (!fs.existsSync(path.dirname(outputPath))) {
//       fs.mkdirSync(path.dirname(outputPath), { recursive: true }); // Create directory if it doesn't exist
//     }
//     formattedCSS.then((data) => {
//       fs.writeFileSync(outputPath, data, "utf8"); // Write formatted CSS
//       console.log("Formatted and minified CSS file generated at", outputPath);
//     });
//   } else {
//     console.log("No CSS generated. Please check your configuration.");
//   }
// }

// Main function to handle CLI commands
async function main() {
  const args = process.argv.slice(2); // Get command line arguments

  const config = readConfigFile();

  if (args[0] === "init") {
    createConfigFile(); // Create the config file if 'init' is passed
  } else if (args[0] === "generate") {
    const config = readConfigFile(); // Read config
    await createUtilityClasses(config); // Generate utility classes using the config
  } else if (args[0] === "cleanup") {
    await cleanUnusedCSS(config.userProjectPath); // Call the cleanup function
  } else {
    console.log(
      'Unknown command. Please use "init" to create a config file or "generate" to generate CSS.'
    );
  }
}

// Call the main function and handle errors
main().catch((error) => {
  console.error("An error occurred:", error);
});
