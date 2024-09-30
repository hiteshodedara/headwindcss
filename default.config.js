const defaultConfig = {
    sizes: [
      { small: "1rem" },
      { large: "5vh" },
      "2rem",
      "20px",
      10
    ],
    colors: [
      { red: "#FF0000" },
      { "gradient-red": "linear-gradient(to right, #FF0000, #FF7F7F)" },
      { "transparent-green": "rgba(0, 255, 0, 0.5)" },
      { green: "#00FF00" },
      { blue: "#0000FF" }
    ],
    PaddingGeneration: true,
    MarginGeneration: true,
    ColorGeneration: true,
    BackgroundGeneration: true,
    FlexboxGeneration: true,
    styleDirname: "dist",
    styleFilename: "style.css",
    userProjectPath: "./files",
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      "2xl": "1536px"
    },
    utilities: {
      margin: ["m", "mt", "mr", "mb", "ml", "mx", "my"],
      padding: ["p", "pt", "pr", "pb", "pl", "px", "py"],
      color: ["text"],
      backgroundColor: ["bg"]
    }
  };
  
  module.exports = defaultConfig;
  