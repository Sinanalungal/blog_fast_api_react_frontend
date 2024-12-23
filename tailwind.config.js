/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins':["Poppins"],
        'roboto':['Roboto']
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Hide scrollbar for Webkit-based browsers */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          "-ms-overflow-style": "none", /* IE and Edge */
          "scrollbar-width": "none", /* Firefox */
        },
      });
    },
  ],
};
