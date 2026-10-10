/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0f172a', 2: '#334155', 3: '#64748b' },
        accent: { DEFAULT: '#2563eb', light: '#60a5fa', soft: '#dbeafe' },
      },
      fontFamily: {
        sans: ['"Onest Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      maxWidth: { wrap: '1200px' },
    },
  },
  plugins: [],
}
