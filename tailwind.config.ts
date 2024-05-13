import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                customBackground: '#21354C',
            },
            keyframes: {
                expandCircle: {
                    '0%': {
                        width: '0px',
                        height: '100px',
                        // borderRadius: '100%',
                    },
                    '100%': {
                        width: '60%',
                        height: '100px',
                        // borderRadius: '80px',
                    },
                },
                'text-focus-in': {
                    '0%': {
                        filter: 'blur(12px)',
                        opacity: '0',
                    },
                    to: {
                        filter: 'blur(0)',
                        opacity: '1',
                    },
                },
            },
            animation: {
                expandCircle: 'expandCircle 0.2s ease-in-out forwards',
                'text-focus-in':
                    'text-focus-in 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both',
            },
        },
    },
    plugins: [],
}
export default config
