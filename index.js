#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prettier = require('prettier'); // Import prettier for formatting
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

// Function to minify CSS
function minifyCSS(css) {
  return new CleanCSS().minify(css).styles;
}

// Function to format CSS using Prettier
function formatCSS(css) {
  return prettier.format(css, { parser: 'css' });
}

// Function to create utility classes
function createUtilityClasses(config = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  let css = '';

  // Generate CSS classes based on the final configuration
  if (finalConfig.MarginGeneration) {
    css += generateMarginClasses(finalConfig.sizes);
  }
  if (finalConfig.PaddingGeneration) {
    css += generatePaddingClasses(finalConfig.sizes);
  }
  if (finalConfig.ColorGeneration) {
    css += generateColorClasses(finalConfig.colors);
  }
  if (finalConfig.BackgroundGeneration) {
    css += generateBackgroundColorClasses(finalConfig.colors);
  }

  if (css) {
    const minifiedCSS = minifyCSS(css);
    const formattedCSS = formatCSS(minifiedCSS); // Format the minified CSS
    const outputPath = path.join(__dirname, 'dist', 'style.css');

    // Ensure the 'dist' directory exists
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    fs.writeFileSync(outputPath, formattedCSS, 'utf8'); // Ensure we are writing string data
    console.log('Formatted and minified CSS file generated at', outputPath);
  } else {
    console.log('No CSS generated. Please check your configuration.');
  }
}

// Main function to handle CLI commands
function main() {
  const args = process.argv.slice(2); // Get command line arguments

  if (args[0] === 'init') {
    createConfigFile(); // Create the config file if 'init' is passed
  } else {
    createUtilityClasses(); // Generate utility classes by default
  }
}

// Call the main function
main();
