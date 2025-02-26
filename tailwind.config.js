/** @type {import('tailwindcss').Config} */
import { platformSelect } from "nativewind/theme"

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      red100: "#f0b0b0",
      red500: "#d00000",
      red700: "#940000",
      green100: "#eaf3d5",
      green500: "#bcd979",
      green700: "#677743",
      cyan100: "#dbedf2",
      cyan500: "#8ac4d4",
      cyan700: "#628b97",
      purple100: "#c0bae5",
      purple500: "#3521ab",
      purple700: "#261779",
      wy100: "#fefdf5",
      wy500: "#fdf7df",
      wy700: "#b4af9e",
      pink100: "#fcc9d4",
      pink500: "#f55274",
      pink700: "#ae3a52",
      yellow100: "#f9efc9",
      yellow500: "#ebcc50",
      yellow700: "#a79139",
      gray100: "#c2c2c2",
      gray500: "#3a3a3a",
      gray700: "#292929",
    },
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
}
