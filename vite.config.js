import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * https://vitejs.dev/config
 */
export default defineConfig({
    root: join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: join(__dirname, 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [vue()],
});
