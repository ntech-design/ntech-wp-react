import { defineConfig, type Plugin } from 'vite';
import preact from '@preact/preset-vite';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import packageJson from './package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function wordpressManifest(): Plugin {
  return {
    name: 'wordpress-manifest',
    generateBundle(_, bundle) {
      const manifest: Record<string, string> = {};

      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk' && file.isEntry && file.name === 'main') {
          manifest['main.js'] = file.fileName;
        }

        if (file.type === 'asset' && /^main(?:\.[\w-]+)?\.css$/.test(file.fileName)) {
          manifest['main.css'] = file.fileName;
        }
      }

      this.emitFile({
        type: 'asset',
        fileName: 'asset-manifest.json',
        source: JSON.stringify(manifest, null, 2),
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: './',
    plugins: [
      preact(),
      svgr({
        include: '**/*.svg',
        svgrOptions: { icon: true },
      }),
      wordpressManifest(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    define: {
      'process.env.APP_VERSION': JSON.stringify(packageJson.version)
    },
    server: {
      open: true,
      host: 'localhost',
      port: 5174,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      manifest: false,
      sourcemap: isProduction ? 'hidden' : 'inline',
      minify: isProduction,
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      rolldownOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.tsx'),
        },
        onLog(level, log, handler) {
          if (
            log.code === 'IMPORT_IS_UNDEFINED' &&
            log.message?.includes('preact/compat')
          ) {
            return;
          }

          handler(level, log);
        },
        output: {
          entryFileNames: isProduction ? '[name].[hash].js' : '[name].js',
          chunkFileNames: isProduction ? '[name].[hash].chunk.js' : '[name].chunk.js',
          assetFileNames: isProduction ? '[name].[hash][extname]' : '[name][extname]',
        },
      },
    },
    test: {
      environment: 'node',
      include: ['src/**/*.test.{ts,tsx}'],
    },
  };
});
