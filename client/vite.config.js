
import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { PORT = 3000 } = process.env;

const isLocal = process.env.NODE_ENV === 'development';

export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: isLocal ? `http://localhost:${PORT}` : 'https://autopartstoreapp.onrender.com',
                changeOrigin: true,
            },
            '/auth': {
                target: isLocal ? `http://localhost:${PORT}` : 'https://autopartstoreapp.onrender.com',
                changeOrigin: true,
            },
            
        },
    },
    build: {
        outDir: '../dist/app',
    },
});
