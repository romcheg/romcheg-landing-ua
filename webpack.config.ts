import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { en, pl, ua } from './src/variables';

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: ['./src/index.ts'],
  mode: isProduction ? 'production' : 'development',
  target: 'web',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    allowedHosts: ['.ngrok.io', 'localhost'],
    static: {
      directory: path.join(__dirname, 'public'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    liveReload: true,
    port: 9000,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      // {
      //   test: /\.ejs$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].html',
      //         context: './src/',
      //         outputPath: '/',
      //       },
      //     },
      //     {
      //       loader: 'extract-loader',
      //     },
      //     {
      //       loader: 'ejs-webpack-loader',
      //     },
      //   ],
      // },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/fonts', to: 'fonts' },
        { from: './src/images', to: 'images' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Title',
      filename: 'index.html',
      template: 'ejs-webpack-loader!src/index.ejs',
      templateParameters: { ...ua },
    }),

    new HtmlWebpackPlugin({
      title: 'Title',
      filename: 'index_en.html',
      template: 'ejs-webpack-loader!src/index_en.ejs',
      templateParameters: { ...en },
    }),

    new HtmlWebpackPlugin({
      title: 'Title',
      filename: 'index_pl.html',
      template: 'ejs-webpack-loader!src/index_pl.ejs',
      templateParameters: { ...pl },
    }),
    new FaviconsWebpackPlugin('./src/favicon.png'),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: isProduction,
  },
};
