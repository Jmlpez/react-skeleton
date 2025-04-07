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
    // resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, './src'),
    //         '@components': path.resolve(__dirname, './src/components'),
    //         '@ui': path.resolve(__dirname, './src/components/ui'),
    //         '@lib': path.resolve(__dirname, './src/lib'),
    //         '@utils': path.resolve(__dirname, './src/lib/utils.ts'),
    //         '@services': path.resolve(__dirname, './src/services'),
    //         '@hooks': path.resolve(__dirname, './src/hooks'),
    //     },
    // },
});
