const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    allowedHosts: [".ngrok.io", "localhost"],
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    liveReload: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      title: "Title",
      filename: "index.html",
      template: "src/index.html",
    }),

    new HtmlWebpackPlugin({
      title: "Title",
      filename: "index_en.html",
      template: "src/index_en.html",
    }),

    new HtmlWebpackPlugin({
      title: "Title",
      filename: "index_pl.html",
      template: "src/index_pl.html",
    }),
    new FaviconsWebpackPlugin("./src/favicon.png")
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin({
        minify: HtmlMinimizerPlugin.swcMinify,
        minimizerOptions: {},
      }),
    ],
  },
};
