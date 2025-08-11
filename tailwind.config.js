/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx,json}'
  ],
  theme: {
    extend: {
      colors: {
        keffiyeh: {
          red: '#B22222',
        },
        olive: '#3D9970',
        teal: '#008080',
        sand: '#F4E3C1',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};