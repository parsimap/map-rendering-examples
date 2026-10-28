const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config({ path: '.env.local' });

module.exports = {
  entry: { main: './src/main.jsx', stateful: './src/stateful.jsx' },
  output: { path: path.resolve(__dirname, 'dist'), clean: true },
  devServer: { client: { overlay: { errors: true, warnings: false } } },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react'] } } },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new webpack.DefinePlugin({ PMI_MAP_TOKEN: JSON.stringify(process.env.PMI_MAP_TOKEN ?? '') }),
    new HtmlWebpackPlugin({ template: './index.html', chunks: ['main'] }),
    new HtmlWebpackPlugin({ template: './index.html', filename: 'stateful/index.html', chunks: ['stateful'] }),
  ],
};
