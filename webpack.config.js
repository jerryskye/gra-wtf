const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|obj)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'THREE': 'three'
    })
  ]
};
