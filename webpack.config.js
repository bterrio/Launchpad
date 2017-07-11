var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test : /\.css?/,
        include : APP_DIR,
        loader : 'css-loader'
      },
      {
        test: /\.(jpg|png|svg|mp3)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      }
    ]
  }
};

module.exports = config;
