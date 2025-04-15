import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        checker({
            typescript: {
                tsconfigPath: './tsconfig.json',
            },
        }),
        tsconfigPaths(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
});
