/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          '50': '#fff5f2',
          '100': '#fee9df',
          '200': '#fec9b9',
          '300': '#fea190',
          '400': '#fd725a',
          '500': '#ff7f50',  // Coral color
          '600': '#ff6b3d',
          '700': '#ff5324',
          '800': '#e6461a',
          '900': '#bf3f19',
        },
        teal: {
          '50': '#e6fffa',
          '100': '#b2f5ea',
          '200': '#81e6d9',
          '300': '#4fd1c5',
          '400': '#38b2ac',
          '500': '#319795',
          '600': '#2c7a7b',
          '700': '#285e61',
          '800': '#234e52',
          '900': '#1d4044',
        },
        indigo: {
          '50': '#e0e8f9',
          '100': '#bed0f7',
          '200': '#98aeeb',
          '300': '#7c8cc4',
          '400': '#667eea',
          '500': '#5a67d8',
          '600': '#4c51bf',
          '700': '#434190',
          '800': '#3c366b',
          '900': '#32315b',
        },
        gray: {
          '50': '#f9fafb',
          '100': '#f4f5f7',
          '200': '#e5e7eb',
          '300': '#d2d6dc',
          '400': '#9fa6b2',
          '500': '#6b7280',
          '600': '#4b5563',
          '700': '#374151',
          '800': '#252f3f',
          '900': '#161e2e',
        },
      },
    },
  },
  plugins: [],
}
