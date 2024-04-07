import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    plugins: [react(),],
    server: {
        host: 'localhost',
        port: 3000,
        proxy: {
            '/api/v1': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
