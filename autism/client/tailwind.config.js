// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // You can name this key anything, like 'serif' or 'noto'
        noto: ['"Noto Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}


