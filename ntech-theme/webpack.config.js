const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
          use: {
            loader: 'babel-loader',
          },
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
          type: 'asset',
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
          type: 'asset/resource',
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'main.css',
      }),

      new webpack.DefinePlugin({
        'process.env': {
          REACT_APP_GRAPHQL_ENDPOINT: JSON.stringify(
            process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql'
          ),
        },
      }),

      new BrowserSyncPlugin({
        proxy: {
          target: 'http://localhost:8080'
        },
        files:[
          '**/*.php',
          './dist/**/*.css',
          './dist/**/*.js'
        ],
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
    ],
  },

  mainConfig = Object.assign({}, config, {
    name: 'main',
    devtool: env.production ? 'hidden-source-map' : 'inline-source-map',
    mode: env.production ? 'production' : 'development',
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: 'auto',
      clean: !env.production
    }
  });

  return [mainConfig];
};
