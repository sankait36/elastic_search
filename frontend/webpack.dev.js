const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 5500,
    contentBase: './dist',
  },
  devtool: 'inline-source-map',
});