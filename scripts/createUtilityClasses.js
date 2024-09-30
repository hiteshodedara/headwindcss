const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");
const prettier = require("prettier");

const defaultConfig = require("../default.config");
const generateMarginClasses = require("../src/margin");
const generatePaddingClasses = require("../src/padding");
const generateColorClasses = require("../src/color");
const generateBackgroundColorClasses = require("../src/background");
const generateFlexboxClasses = require("../src/flexbox");
const generateResponsiveClasses = require("../src/responsiveStyle");


function formatCSS(css) {
  return prettier.format(css, { parser: "css" });
}

function minifyCSS(css) {
  return new CleanCSS().minify(css).styles;
}

async function createUtilityClasses(config = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  let css = "";

  // Generate CSS classes based on the final configuration
  if (finalConfig.MarginGeneration) {
    css += await generateMarginClasses(finalConfig.sizes);
  }
  if (finalConfig.PaddingGeneration) {
    css += await generatePaddingClasses(finalConfig.sizes);
  }
  if (finalConfig.ColorGeneration) {
    css += await generateColorClasses(finalConfig.colors);
  }
  if (finalConfig.BackgroundGeneration) {
    css += await generateBackgroundColorClasses(finalConfig.colors);
  }

  if (finalConfig.FlexboxGeneration) {
    // Check if Flexbox generation is enabled
    css += await generateFlexboxClasses(); // Generate Flexbox classes
  }

  if (finalConfig.ResponsiveGeneration) {
    // Check if Responsive generation is enabled
    css += await generateResponsiveClasses(finalConfig.breakpoints, finalConfig.utilities, finalConfig.sizes); // Generate Responsive classes
  }

  // Ensure that CSS is generated before proceeding
  if (css) {
    const minifiedCSS = minifyCSS(css); // Minify the generated CSS
    const formattedCSS = formatCSS(minifiedCSS); // Format the minified CSS
    const outputDir = path.join(process.cwd(), finalConfig.styleDirname);
    const outputPath = path.join(outputDir, finalConfig.styleFilename);

    // Ensure the 'dist' directory exists
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true }); // Create directory if it doesn't exist
    }
    formattedCSS.then((data) => {
      fs.writeFileSync(outputPath, data, "utf8"); // Write formatted CSS
      console.log("Formatted and minified CSS file generated at", outputPath);
    });
  } else {
    console.log("No CSS generated. Please check your configuration.");
  }
}

module.exports = createUtilityClasses;
