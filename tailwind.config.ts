import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/components/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'nico': ['NicoMoji'],
        'zen-maru': ['Zen Maru Gothic', 'serif'],
      },
      animation: {
        "fade-out": "fade-out 1s ease   both",
        "fade-in": "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both"
      },
      keyframes: {
        "fade-out": {
          "0%": {
            opacity: "1"
          },
          to: {
            opacity: "0"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0"
          },
          to: {
            opacity: "1"
          }
        }
      }
    },
  },
  plugins: [],
}

export default config
