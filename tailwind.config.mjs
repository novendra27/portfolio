/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#090d16',
        surface: {
          card: '#0f172a',
          elevated: '#1e293b',
        },
        border: {
          architectural: 'rgba(255, 255, 255, 0.08)',
          'architectural-hover': 'rgba(255, 255, 255, 0.16)',
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
    },
  },
  plugins: [],
};
