import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ react() ],
    test: {
        enviroment: 'jsdom',
        globals:true,
        setupFiles:[ './src/tests/setup.ts' ],
    }
});
