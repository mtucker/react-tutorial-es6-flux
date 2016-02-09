var path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'index.js',
    sourceMapFilename: "[file].map",
    publicPath: 'http://localhost:8090/assets'
  },
  debug: true,
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.jsx?$/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ["transform-decorators-legacy"]
        }
      }
    ]
  },
  resolve: {
      extensions: [
        '',
        '.js',
        '.json',
        '.jsx',
        '.html',
        '.css',
        '.scss',
        '.yaml',
        '.yml'
      ]
    },
};
