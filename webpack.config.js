const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'Build'),
    publicPath: '/',
    filename: 'index.js',
  },
  target: 'node',
};
