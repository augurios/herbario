import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
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
    plugins: [
        vue(),
        vuetify({
            autoImport: true,
            styles: { 
                configFile: join(__dirname, 'src', 'renderer', 'scss', 'variables.scss')
            }
        })
    ],
    resolve: {
        alias: {
            '@': join(__dirname, 'src', 'renderer')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {}
        }
    },
    optimizeDeps: {
        exclude: ['vuetify'],
        entries: [join(__dirname, 'src', 'renderer', '**', '*.vue')]
    }
});
