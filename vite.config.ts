import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {execSync} from 'child_process';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function calculaFacilStaticPlugin(): Plugin {
  return {
    name: 'calculafacil-static-build',
    apply: 'build',
    buildStart() {
      if (process.env.CF_SKIP_PREBUILD === '1') return;
      execSync('npx tsx scripts/generate-static-site.ts', {
        stdio: 'inherit',
        env: {...process.env, CF_SKIP_PREBUILD: '1'},
      });
    },
    closeBundle() {
      execSync('npx tsx scripts/generate-static-site.ts --post-build', {
        stdio: 'inherit',
        env: {...process.env, CF_SKIP_PREBUILD: '1'},
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    publicDir: 'public',
    plugins: [react(), tailwindcss(), calculaFacilStaticPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      cssCodeSplit: false,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/app.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/app.css';
            }
            return 'assets/[name][extname]';
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
