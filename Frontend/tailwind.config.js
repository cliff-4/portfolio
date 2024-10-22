/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'theme1': '#aed3e9',
      'theme2': '#b5f1fe',
      'theme3': '#fffdfd',
      'theme4': '#91e3d5',
      'theme5': '#cdeeec',
      'theme6': '#005bb1',
      'black' : '#000000',
      'white' : '#ffffff'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      
    },
    extend: {
      backgroundImage: {
        'bungee': "url('/img/DSCF0534.JPG')"
      }
    },
  },
  plugins: [],
}

