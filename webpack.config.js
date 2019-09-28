const webpack = require('webpack') // eslint-disable-line
const path = require('path')
const workboxplugin = require('workbox-webpack-plugin')

const BUILD_DIR = path.join(__dirname, 'public', 'js')
const APP_DIR = path.join(__dirname, 'src', 'frontend')

const config = {
  entry: ['babel-polyfill', `${APP_DIR}/index.js`],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // new swplugin({
    //   entry: path.join(__dirname, 'public/sw.js'),
    // }),
    new workboxplugin.GenerateSW(),
  ],
}

module.exports = config
