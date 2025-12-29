/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
