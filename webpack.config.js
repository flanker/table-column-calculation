const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    "table-column-calculation": "./src/table-column-calculation.js",
    "table-column-calculation.min": "./src/table-column-calculation.js",
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
    new UglifyJSPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    })
  ]
};
