const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: "production",

  entry: {
    mainapp: "./src/app.tsx",
  },

  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'publish'),
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

  module: {
    rules: [{
        test: /\.tsx?$/,
        include: /src/,
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ["es5"]
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
        test: /\.svg$/,
        loader: 'svg-loader?pngScale=2'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap'})
      },
    ]
  },

  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin('[name].min.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
}