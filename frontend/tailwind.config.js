/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cosh-black': { DEFAULT: '#0B0F19', 50: '#1A2035', 100: '#151B2D', 200: '#0B0F19', 300: '#080B14' },
        'cosh-navy': { DEFAULT: '#131B2E', 50: '#2A3A5C', 100: '#1E2A45', 200: '#131B2E', 300: '#0D1526', 400: '#1E2235' },
        'cosh-green': { DEFAULT: '#10B981', 50: '#D1FAE5', 100: '#A7F3D0', 200: '#6EE7B7', 300: '#34D399', 400: '#10B981', 500: '#059669', 600: '#00E676' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, #131B2E 0%, #0B0F19 60%)',
        'card-gradient': 'linear-gradient(145deg, #131B2E 0%, #0B0F19 100%)',
        'glow-green': 'radial-gradient(circle at center, rgba(16,185,129,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
