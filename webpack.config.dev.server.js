var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var WebpackShellPlugin = require('webpack-shell-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');



var serverConfig = {
  stats: 'normal',
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
   //chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader', exclude:/node_modules/ }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Server Start"'], onBuildEnd:['nodemon  dist/server.js ']}),
  ]
}




module.exports = [serverConfig]