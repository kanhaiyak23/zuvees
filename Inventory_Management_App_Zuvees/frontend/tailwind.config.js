// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily:{
//         nicomoji:['Nico Moji', 'sans-serif']
//       }
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@shadcn/ui/dist/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nicomoji: ['Nico Moji', 'sans-serif'],
        montserrat:['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

