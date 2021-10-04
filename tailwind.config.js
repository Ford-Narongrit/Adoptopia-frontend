const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        shark: {
          "50": "#f4f4f4",
          "100": "#e9e9e9",
          "200": "#c9c9c9",
          "300": "#a9a9a9",
          "400": "#686868",
          "500": "#272727",
          "600": "#232323",
          "700": "#1d1d1d",
          "800": "#171717",
          "900": "#131313",
        },
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        gray: colors.gray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const buttons = {
        '.btn-rounded': {
          background: '#1E63E9',
          borderRadius: '20px',
          flex: 'none',
          width: '6em',
          height: '2.2em',
          fontSize: '1rem',
          fontWeight: '600',

          '&:hover': {
            color: '#1E63E9',
            background: '#ffffff'
          }
        },

        '.btn-square': {
          background: '#1E63E9',
          borderRadius: '5px',
          flex: 'none',
          width: '6em',
          height: '2.2em',
          fontSize: '1rem',
          fontWeight: '600',

          '&:hover': {
            color: '#1E63E9',
            background: '#ffffff'
          }
        },

        '.btn-sugges': {
          background: '#1E63E9',
          borderRadius: '5px',
          flex: 'none',
          width: '8em',
          height: '2.2em',
          fontSize: '1rem',
          marginLeft: '64em',
          fontWeight: '600',

          '&:hover': {
            color: '#1E63E9',
            background: '#ffffff'
          }
        }
      }
      addComponents(buttons);

      const cards = {
        '.my-card': {
          background: '#FFFFFF',
          width: '16rem',
          borderRadius: '0.25rem',
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          transition: '0.25s',

          '&:hover': {
            transform: 'scale(1.05)',
            transition: '0.25s',
          }
        },
      }
      addComponents(cards);
    })
  ],
};
