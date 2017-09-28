var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.join(__dirname, 'public','js');
var APP_DIR = path.join(__dirname, 'src', 'shared', 'components');

var config = {
  entry: APP_DIR + 'App.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
};

module.exports = config