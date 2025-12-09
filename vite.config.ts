import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Correctly inject only the API_KEY. 
      // Do NOT inject the entire process.env object as it breaks the browser build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});