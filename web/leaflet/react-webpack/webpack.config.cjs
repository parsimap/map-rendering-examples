const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config({ path: '.env.local' });

module.exports = {
  entry: { main: './src/main.tsx', stateful: './src/stateful.tsx' },
  output: { path: path.resolve(__dirname, 'dist'), clean: true },
  devServer: { client: { overlay: { errors: true, warnings: false } } },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'] },
        },
      },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  plugins: [
    new webpack.DefinePlugin({ PMI_MAP_TOKEN: JSON.stringify(process.env.PMI_MAP_TOKEN ?? '') }),
    new HtmlWebpackPlugin({ template: './index.html', chunks: ['main'], title: 'Parsimap + Leaflet + React (webpack)' }),
    new HtmlWebpackPlugin({ template: './index.html', filename: 'stateful/index.html', chunks: ['stateful'], title: 'Parsimap + Leaflet + React (webpack) – stateful' }),
  ],
};
