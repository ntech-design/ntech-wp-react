const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const packageJson = require('./package.json');

module.exports = (env) => {
  const config = {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
      modules: ['app', 'node_modules'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test:  /.(js|jsx)$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' },
        },
        {
          test: /.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /\.module\.scss$/ // only *.module.scss uses modules
                }
              }
            },
            'css-modules-typescript-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          type: 'asset/resource',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
        },
        {
          test: /\.(woff2|woff|ttf|eot)$/,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /url/,
              type: 'asset/resource',
            },
            {
              issuer: /\.[jt]sx?$/,
              resourceQuery: { not: [/url/] },
              use: ['@svgr/webpack'],
            },
            {
              type: 'asset/resource',
            },
          ],
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.APP_VERSION': JSON.stringify(packageJson.version),
      }),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '',
        writeToFileEmit: true,
        generate: (seed, files) => {
          const manifest = {};
          files.forEach(file => {
            if (file.name) {
              manifest[file.name] = file.path;
            }
          });
          return manifest;
        }
      }),

      new MiniCssExtractPlugin({
        filename: env.production ? '[name].[contenthash:8].css' : '[name].css',
        chunkFilename: env.production ? '[id].[contenthash:8].css' : '[id].css',
      }),

      new webpack.DefinePlugin({
        'process.env': {
          REACT_APP_GRAPHQL_ENDPOINT: JSON.stringify(
            process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql'
          ),
        },
      }),

      !env.production && new BrowserSyncPlugin({
        proxy: { target: 'http://localhost:8080' },
        files:['**/*.php', './dist/**/*.css', './dist/**/*.js'],
        ui: { port: 3001 },
        cors: true,
        notify: true,
        reloadDelay: 0,
        // logLevel: 'debug',
      }, {
        reload: true,
        port: 3000,
        open: true,
        injectCss: true
      }),
    ].filter(Boolean),

    optimization: {
      moduleIds: 'deterministic',
      chunkIds: env.production ? 'deterministic' : 'named',
      runtimeChunk: env.production ? 'single' : false,
      splitChunks: {
        chunks: env.production ? 'all' : 'async',
        name: false,
        cacheGroups: env.production ? {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 20,
          },
        } : undefined,
      },
    },
  },

  mainConfig = {
    ...config,
    name: 'main',
    devtool: env.production ? 'hidden-source-map' : 'inline-source-map',
    mode: env.production ? 'production' : 'development',
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      filename: env.production ? '[name].[contenthash:8].js' : '[name].js',
      chunkFilename: env.production ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: 'auto',
      clean: true
    },

    optimization: {
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',

      runtimeChunk: env.production ? 'single' : false,
      splitChunks: {
        chunks: 'async',
        name: false,
      },
    },
  };

  return [mainConfig];
};
