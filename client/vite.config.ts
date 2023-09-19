import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@typescript-eslint/eslint-plugin';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ react(), eslint() ],
});
