module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: '"Roboto", Helvetica, Arial, sans-serif',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
