/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#090d16',
        surface: {
          card: '#0c1220',
          elevated: '#162035',
        },
        border: {
          architectural: 'rgba(255, 255, 255, 0.22)',
          'architectural-hover': 'rgba(255, 255, 255, 0.45)',
          subtle: 'rgba(255, 255, 255, 0.14)',
          accent: 'rgba(16, 185, 129, 0.50)',
        },
        accent: {
          primary: '#10b981',
          'primary-light': '#34d399',
        },
        text: {
          contrast: '#f8fafc',
          muted: '#94a3b8',
          dim: '#64748b',
        },
      },
      fontFamily: {
        sans: ['Geist Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: {
        card: '8px',
        control: '6px',
      },
      boxShadow: {
        'tactile-primary': 'inset 0 -2px 0 0 hsl(160, 84%, 25%), 0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        'tactile-surface': 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
