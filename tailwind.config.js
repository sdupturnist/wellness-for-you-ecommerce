/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5BA642",            // Custom Primary Color
        "primary-hover": "#498f31",    // Custom Hover Color
        "primary-light": "#74B73B",    // Light Primary Color
        "primary-dim": "#E7F2EC",      // Dimmed Primary Color
        secondary: "#313C91",          // Custom Secondary Color
        "secondary-light": "#00A1DF",  // Light Secondary Color
        "secondary-dim": "#D7F4FF",    // Dimmed Secondary Color
        dark: "#15181E",               // Dark Color
        body: "#333",                  // Body Color
        light: "#A8B3C4",              // Light Color
        white: "#fff",                 // White Color
        border: "#ECECEC",             // Border Color
        yellow: "#FFAB07",             // Yellow Color
        dim: "#ffffff1c",              // Dimmed Color
        bggray: "#F6F7FC",             // Border Dim Color
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: false,  // Disable themes feature in DaisyUI
    darkTheme: false,  // Disable dark theme
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",  // Define theme root
    themes: [
      {
        custom: {
          // Define custom theme for DaisyUI
          "primary": "#5BA642",            // Custom Primary Color
          "primary-focus": "#5BA642",      // Hover Primary Color
          "primary-content": "#ffffff",    // Text color on primary background
          "success": "#5BA642",            // Success color for checkboxes
        },
      },
    ],
  },
  darkMode: false,  // Ensure dark mode is completely disabled globally in TailwindCSS
}
