#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const generateMarginClasses = require('./src/margin');
const generatePaddingClasses = require('./src/padding');
const generateColorClasses = require('./src/color');
const generateBackgroundColorClasses = require('./src/background');
const CleanCSS = require('clean-css');

const configFileName = 'headwind.config.json'; // Default config file name

// Default configuration
const defaultConfig = {
  sizes: ['4px', '8px', '16px'],
  colors: ['red', 'green', 'blue'],
  PaddingGeneration: true,
  MarginGeneration: true,
  ColorGeneration: true,
  BackgroundGeneration: true,
};

// Function to create a default config file
function createConfigFile() {
  if (!fs.existsSync(configFileName)) {
    fs.writeFileSync(configFileName, JSON.stringify(defaultConfig, null, 2), 'utf8');
    console.log(`${configFileName} created with default settings.`);
  } else {
    console.log(`${configFileName} already exists.`);
  }
}

// Function to read the configuration from the file
function readConfigFile() {
  if (fs.existsSync(configFileName)) {
    const configData = fs.readFileSync(configFileName, 'utf8');
    return JSON.parse(configData);
  } else {
    console.log(`${configFileName} does not exist. Using default configuration.`);
    return defaultConfig;
  }
}

// Function to minify CSS
function minifyCSS(css) {
  return new CleanCSS().minify(css).styles;
}

// Function to format CSS using Prettier
function formatCSS(css) {
  return prettier.format(css, { parser: 'css' });
}

// Function to create utility classes
async function createUtilityClasses(config = {}) {
    const finalConfig = { ...defaultConfig, ...config };
    let css = '';
  
    // Generate CSS classes based on the final configuration
    if (finalConfig.MarginGeneration) {
      css += await generateMarginClasses(finalConfig.sizes); // Ensure this function returns a string
    }
    if (finalConfig.PaddingGeneration) {
      css += await generatePaddingClasses(finalConfig.sizes); // Ensure this function returns a string
    }
    if (finalConfig.ColorGeneration) {
      css += await generateColorClasses(finalConfig.colors); // Ensure this function returns a string
    }
    if (finalConfig.BackgroundGeneration) {
      css += await generateBackgroundColorClasses(finalConfig.colors); // Ensure this function returns a string
    }
  
    // Ensure that CSS is generated before proceeding
    if (css) {
      const minifiedCSS = minifyCSS(css); // Minify the generated CSS
      const formattedCSS = formatCSS(minifiedCSS); // Format the minified CSS
      const outputPath = path.join(__dirname, 'dist', 'style.css');
  
      // Ensure the 'dist' directory exists
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
      }

      formattedCSS .then(result => {
        fs.writeFileSync(outputPath, result, 'utf8');
        console.log('Formatted and minified CSS file generated at', outputPath);
    })
    .catch(error => {
        console.error(error); // If the promise was rejected
    })
    } else {
      console.log('No CSS generated. Please check your configuration.');
    }
  }
  

// Main function to handle CLI commands
async function main() {
  const args = process.argv.slice(2); // Get command line arguments

  if (args[0] === 'init') {
    createConfigFile(); // Create the config file if 'init' is passed
  } else if (args[0] === 'generate') {
    const config = readConfigFile(); // Read config
    await createUtilityClasses(config); // Generate utility classes using the config
  } else {
    console.log('Unknown command. Please use "init" to create a config file or "generate" to generate CSS.');
  }
}

// Call the main function and handle errors
main().catch(error => {
  console.error('An error occurred:', error);
});
