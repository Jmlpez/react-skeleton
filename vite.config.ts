import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    // build: {
        // rollupOptions: {
        //     input: {
        //         main: path.resolve(__dirname, 'index.html'),
        //     },
        //     output: {
        //         manualChunks(id) {
        //             if (id.includes('src/demos')) {
        //                 return 'demos';
        //             }
        //         },
        //     },
        // },
    // },
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
