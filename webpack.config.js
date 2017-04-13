const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: './src/index',
  resolve: {
    modules: ['node_modules', __dirname],
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'react-class-props.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: pkg.babel,
        },
      },
    ],
  },
  externals : {
    react: 'react'
  },
};
