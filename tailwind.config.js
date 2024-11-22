/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#137E43",   
        "primary-hover": "#2b8b56",             // Custom Primary Color
        "primary-light": "#74B73B",     // Light Primary Color
        "primary-dim": "#E7F2EC",      // Dimmed Primary Color
        secondary: "#313C91",           // Custom Secondary Color
        "secondary-light": "#00A1DF",  // Light Secondary Color
        "secondary-dim": "#D7F4FF",    // Dimmed Secondary Color
        dark: "#15181E",                // Dark Color
        body: "#333",                // Body Color
        light: "#A8B3C4",               // Light Color
        white: "#fff",                  // White Color
        border: "#ECECEC",              // Border Color
        yellow: "#FFAB07",              // Yellow Color
        dim: "#ffffff1c",  
        bggray: "#F6F7FC",            // Border Dim Color
      },
    },
  },
  plugins: [],
  plugins: [daisyui],
};
