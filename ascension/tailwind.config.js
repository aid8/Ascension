/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      gray: '#9ca3af',
      red: '#BE2525',
      red_hover: '#A62121',
      red_active: '#8C1D1D',
      blue: '#346FE2',
      blue_hover: '#3063C7',
      blue_active: '#2C59B3',
      gold: '#FAC213',
      gold_hover: '#ebb615',
      gold_active: '#b88e0d'
    },
    fontFamily :{
      default: ['Lexend Deca', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        default: "url('/src/assets/img/background/bg-default.jpg')",
        profile: "url('/src/assets/img/background/bg-profile.jpg')",
        text_logo: "url('/src/assets/img/logo/text-logo-default.png')"
      },
      boxShadow: {
        profile: 'inset 0px 0px 100px 80px #000000' /*x-axis, y-axis, blue, spread, color*/
      },
      fontSize: {
        a_l: '13px',
        a_r: '12px',
        a_s: '10px'
      },
    },
  },
  plugins: [],
}
