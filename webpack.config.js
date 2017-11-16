const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const bannerMessage = `
TableColumnCalculation
https://github.com/flanker/table-column-calculation
`

module.exports = {
  entry: {
    "table-column-calculation": "./src/table-column-calculation.js",
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'tableColumnCalculation'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin(bannerMessage),
    new UglifyJSPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'example/index.html',
        to: 'index.html'
      }
    ])
  ]
};
