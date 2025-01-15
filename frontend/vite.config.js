import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/service1': {
        target: 'http://localhost:8081', // Backend microservice 1
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/service1/, ''), // Remove '/service1' from the path
      },
      '/service2': {
        target: 'http://localhost:8082', // Backend microservice 2
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/service2/, ''), // Remove '/service2' from the path
      },
      '/service3': {
        target: 'http://localhost:8083', // Backend microservice 3
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/service3/, ''), // Remove '/service3' from the path
      },
    },
  },
});
