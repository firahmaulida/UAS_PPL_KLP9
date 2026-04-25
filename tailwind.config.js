/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Artinya: cari kode Tailwind di semua file dalam folder src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
