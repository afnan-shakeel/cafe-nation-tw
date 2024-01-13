/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      fontFamily: {
        PhenomenaThin: ['PhenomenaThin', 'sans-serif'], 
        PhenomenaBold: ['PhenomenaBold', 'sans-serif'], 
        PhenomenaExtraBold: ['PhenomenaExtraBold', 'sans-serif'], 
        PhenomenaExtraLight: ['PhenomenaExtraLight', 'sans-serif'], 
        PhenomenaRegular: ['PhenomenaRegular', 'sans-serif'], 
        PhenomenaBlack: ['PhenomenaBlack', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

