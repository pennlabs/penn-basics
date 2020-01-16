const webpack = require('webpack') // eslint-disable-line
const path = require('path')
const workboxplugin = require('workbox-webpack-plugin')
require('dotenv').config()

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
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new workboxplugin.GenerateSW(),
    new webpack.DefinePlugin({
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(
        process.env.GOOGLE_MAPS_API_KEY
      ),
    }),
  ],
}

module.exports = config
