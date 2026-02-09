const config = {
  darkMode: 'class', // dark mode controlled via class
  content: [
    './app/**/*.{ts,tsx,js,jsx}', // include JS/TS files
    './components/**/*.{ts,tsx,js,jsx}' // include JS/TS files
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif']
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        destructive: 'rgb(var(--destructive) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
