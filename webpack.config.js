var webpack = require('webpack');
var path = require('path');

var isDebug = process.env.DEBUG == 'undefined' || process.env.DEBUG == 'true';

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'app/src');

var config = {
  context: __dirname,
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    publicPath: BUILD_DIR + '/',
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
        loader : 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|svg|mp3)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      }
    ]
  },
  plugins: isDebug ? [] : [
  ],
  devtool: 'source-map'
};

module.exports = config;
