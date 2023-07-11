/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#c2ef67",
          secondary: "#a4abe8",
          accent: "#047028",
          neutral: "#251b27",
          "base-100": "#3e2c3f",
          info: "#34a5da",
          success: "#84e1ba",
          warning: "#f6cd13",
          error: "#eb4928",
        },
      },
    ],
  },
};
