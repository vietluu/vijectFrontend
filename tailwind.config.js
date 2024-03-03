/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            theme: {
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                },
                screens: {
                    desktop: '1024px',
                    tablet: { min: '768px', max: '1023px' },
                    mobile: { max: '768px' },
                },
            },
        },
        plugins: [],
        corePlugins: {
            preflight: false,
        },
    },
}
