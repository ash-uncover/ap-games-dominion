/* eslint-disable */

const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base.js')

const DIR_DIST = path.resolve(__dirname, 'dist')
const DIR_PUBLIC = path.resolve(__dirname, 'public')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 8089

const transformPlugin = (buffer) => {
  const plugin = JSON.parse(buffer.toString())
  plugin.url = `http://localhost:${PORT}`
  return JSON.stringify(plugin, null, 2)
}

module.exports = merge(base, {
  mode: 'development',

  output: {
    clean: true,
    path: DIR_DIST,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.png',
      template: './src/index.html',
      title: 'AP Dominion',
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'plugin.json'),
        to: '.',
        transform: transformPlugin
      }],
    }),
  ],

  devtool: 'eval-source-map',

  devServer: {
    client: {
      progress: false,
    },
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    port: PORT,
    static: {
      directory: DIR_PUBLIC,
    },
  },
})

