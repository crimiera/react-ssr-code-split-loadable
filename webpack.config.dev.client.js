var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var WebpackShellPlugin = require('webpack-shell-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');


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
    new ManifestPlugin({publicPath:""}),
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Client Start"'], onBuildEnd:['webpack --watch --mode development --config webpack.config.dev.server.js ']}),
    // new BrowserSyncPlugin( // BrowserSync options
    //   {
    //     // browse to http://localhost:3000/ during development
    //     host: 'localhost',
    //     port: 3001,
    //     // proxy the Webpack Dev Server endpoint
    //     // (which should be serving on http://localhost:3100/)
    //     // through BrowserSync
    //     proxy: 'http://localhost:3000/'
    //   },
      // plugin options
      // {
      //   // prevent BrowserSync from reloading the page
      //   // and let Webpack Dev Server take care of this
      //   reload: true
      // })
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks:"all"
  //   }
  // }
}

module.exports = [browserConfig]