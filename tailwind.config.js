/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Palette
        primary: {
          DEFAULT: '#0D9488',
          dark: '#0F766E',
        },
        secondary: {
          DEFAULT: '#E63946',
          dark: '#C53030',
        },
        accent: {
          DEFAULT: '#E9C46A',
          light: '#FFF8E7',
        },
        neutral: {
          background: '#F8FAF9',
          border: '#E5E7EB',
          text: '#0F172A',
        },
        // Legacy support (will be migrated)
        olive: '#0D9488',
        'keffiyeh-red': '#E63946',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0D9488 0%, #E63946 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(13, 148, 136, 0.05) 0%, rgba(230, 57, 70, 0.05) 100%)',
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(13, 148, 136, 0.1), 0 2px 4px -1px rgba(230, 57, 70, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(13, 148, 136, 0.1), 0 4px 6px -2px rgba(230, 57, 70, 0.05)',
      },
      ringColor: {
        'brand': '#0D9488',
        'secondary': '#E63946',
      },
    },
  },
  plugins: [],
}