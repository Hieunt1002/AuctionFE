/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: '#fafafa',
        lightGray: '#F9F9F9',
      },
      maxWidth: {
        '1440px': '1440px', // Custom max-width for 1440px
      },
    },
  },
  plugins: [
    lineClamp,
    tailwindScrollbar,
  ],
};
