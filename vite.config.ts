import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@core',
        replacement: path.resolve(__dirname, 'src/core'),
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, 'src/helpers'),
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, 'src/services'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: '@theme',
        replacement: path.resolve(__dirname, 'src/theme'),
      },
      {
        find: '@images',
        replacement: path.resolve(__dirname, 'src/static/images'),
      },
      {
        find: '@icons',
        replacement: path.resolve(__dirname, 'src/static/icons'),
      },
    ],
  },
});

