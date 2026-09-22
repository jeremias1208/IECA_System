/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ieca: {
          coral: '#E54856',
          'coral-hover': '#C93643',
          'coral-light': '#FDF2F3',
          green: '#1E6B15',
          'green-hover': '#16520F',
          'green-light': '#F0F9EE',
          gold: '#C59B27',
          'gold-light': '#FDF8EC',
          black: '#1F1515',
          dark: '#2D1B1C',
          beige: '#F9F6F0',
          'beige-light': '#FCFAF7',
          gray: '#524848',
          'gray-light': '#F5F3F2',
          'gray-border': '#E6E1E0',
          light: '#FAFAFA',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Garamond', 'Playfair Display', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      borderRadius: {
        'card': '8px',
        'btn': '4px',
      }
    },
  },
  plugins: [],
}
