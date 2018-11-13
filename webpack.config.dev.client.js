const fs = require('fs');
const path = require('path');
const url = require('url');
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var WebpackShellPlugin = require('webpack-shell-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var MyManifestPlugin =  require('./manifest.js');

var browserConfig = {
  mode:'development',
  stats:'normal',
  watch: true,
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contentHash].client.js',
    chunkFilename: '[name].[contentHash].client.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader',exclude: /node_modules/ },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
   // new ManifestPlugin({publicPath:""}),
    new MyManifestPlugin({
      filename: './dist/react-loadable.json',
    }),
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Client Start"'], onBuildEnd:['webpack --watch --mode development --config webpack.config.dev.server.js ']}),
  ],

}

module.exports = [browserConfig]