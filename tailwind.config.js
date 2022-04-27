module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue,css,mdx}',
    './src/**/**/*.{js,jsx,ts,tsx,vue,css,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#101828',
        dark: '#667085',
        primary: {
          light: '#F9F5FF',
          DEFAULT: '#7F56D9', // 600
          dark: '#6941C6', // 700
          darker: '#53389E', // 800
          200: '#E9D7FE',
        },
        light: '#F9FAFB', // Gray 50
        gray: {
          50: '#F9FAFB',
          200: '#EAECF0',
          400: '#98A2B3',
          500: '#667085',
          800: '#1D2939',
        },
      },
      gridTemplateColumns: {
        docs: '1fr 3fr',
      },
      borderColor: {
        DEFAULT: '#242424',
      },
      transitionDuration: {
        DEFAULT: '600ms',
      },
      fontSize: {
        xs: [14, '20px'],
        sm: [16, '24px'],
        base: [18, '28px'],
        '2xl': [24, '32px'],
        '4xl': [36, '44px'],
        '5xl': [48, '60px'],
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/custom-forms'),
    // ...
  ],
};
