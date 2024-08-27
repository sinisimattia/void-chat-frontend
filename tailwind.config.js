/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SpaceMono"', 'monospace'],
        serif: ['"SpaceMono"', 'monospace'],
        mono: ['"SpaceMono"', 'monospace'],
      },
      colors: {
        'foreground': '#FFF',
        'background': '#000',
        'accent': '#ff8800',
      }
    },
  },
  plugins: [],
}

