const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env = {}) => {
  const token = dotenv.config({ path: '.env.local' }).parsed?.PMI_MAP_TOKEN || '';
  return {
    entry: env.stateful ? './src/main-stateful.jsx' : './src/main.jsx',
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
      new webpack.DefinePlugin({ PMI_MAP_TOKEN: JSON.stringify(token) }),
      new HtmlWebpackPlugin({ template: './index.html' }),
    ],
  };
};
