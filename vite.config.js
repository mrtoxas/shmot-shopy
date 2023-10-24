import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        eslintPlugin({
            cache: false,
            fix: true,
            include: ['resources/js/**/*.ts', 'resources/js/**/*.tsx'],
          }),
    ],
});