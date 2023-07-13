const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
