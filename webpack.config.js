var path = require('path');

module.exports = {
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
          presets: ['es2015', 'react'],
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'index.js'
  },
};
