const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config({ path: '.env.local' });

module.exports = {
  entry: './src/index.js',
  output: { path: path.resolve(__dirname, 'dist'), clean: true },
  devServer: { client: { overlay: { errors: true, warnings: false } } },
  module: { rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }] },
  plugins: [
    new webpack.DefinePlugin({ PMI_MAP_TOKEN: JSON.stringify(process.env.PMI_MAP_TOKEN ?? '') }),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
};
