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
    library: 'react-class-props',
    libraryTarget: 'umd',
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
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
  },
};
