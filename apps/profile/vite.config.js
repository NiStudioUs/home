import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react()],

  build: {
    // Conditional sourcemap
    sourcemap: mode === 'development' ? 'inline' : false,

    // Use Terser for maximum minification + obfuscation
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove all console.* calls and debugger statements
        drop_console: true,
        drop_debugger: true,
        // Reduced compression passes for faster builds
        passes: 1,
        // Remove dead code aggressively
        dead_code: true,
        // Inline short functions
        inline: 3,
        // Remove unused variables
        unused: true,
      },
      mangle: {
        // Mangle property names (aggressive — increases obfuscation significantly)
        properties: {
          // Only mangle props that start with _ (private convention)
          regex: /^_/,
        },
      },
      format: {
        // Strip all comments from output
        comments: false,
      },
    },

    // Split vendor chunks to reduce fingerprinting of app logic
    rollupOptions: {
      output: {
        // Deterministic but opaque chunk names
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split react into its own vendor chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            // All other node_modules into a separate vendor chunk
            return 'vendor'
          }
        },
      },
    },
  },
}))

