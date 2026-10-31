const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config({ path: '.env.local' });

module.exports = {
  entry: './src/main.tsx',
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
    new HtmlWebpackPlugin({ template: './index.html', title: 'Parsimap + Mapbox GL JS + React (webpack)' }),
  ],
};
