/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#F4F5F7',
          dark: '#111315',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1B1E21',
        },
        border: {
          light: '#E5E7EB',
          dark: '#2A2E33',
        },
        accent: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#EEF2FF',
          dark: '#312E81',
        },
        primary: {
          light: '#1F2937',
          dark: '#F9FAFB',
        },
        secondary: {
          light: '#6B7280',
          dark: '#9CA3AF',
        },
        input: {
          light: '#F9FAFB',
          dark: '#26292D',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        glow: '0 0 20px -5px rgba(99, 102, 241, 0.25)',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
  plugins: [],
};
