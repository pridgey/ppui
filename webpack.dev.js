const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: "development",

  entry: {
    mainapp: "./src/app.tsx",
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'Public')
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      }
    },
    runtimeChunk: true
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", "*.png", "*.jpg", "*.svg"]
  },

  devServer: {
    contentBase: 'Public',
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:3000"
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ["env"]
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /src/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('typings-for-css-modules-loader?modules&namedExport&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },

      { test: /\.svg$/, loader: 'svg-loader?pngScale=2' }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './assets/index.html'
    })]
}