const merge = require('webpack-merge');

const mode = 'development';
process.env.NODE_ENV = mode;

// helpers
const {htmlWebpackPluginHelper, resolvePath, appDirectory} = require('./tools/helpers');
const commonConfig = require('./common.config');
const entryPoints = require('./tools/entry-points');
const paths = require('./tools/paths');

module.exports = function (webpackEnv, argv) {
  const configHtmlWebpackPlugin = {
    minify: false
  }

  return merge(commonConfig, {
    mode,
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    plugins: [
      ...htmlWebpackPluginHelper(entryPoints, configHtmlWebpackPlugin)
    ],
    devServer: {
      contentBase: resolvePath(paths.public),
      compress: true,
      port: 8081,
      hot: true,
      open: false,
      index: (entryPoints && entryPoints.length) ? entryPoints[0] + '.html' : 'index.html',
      watchContentBase: true,
      watchOptions: {
        ignored: /node_modules/
      },
      proxy: {
        "/api": "http://localhost:8080",
      }
    },
    devtool: 'inline-source-map',
  })
}
