const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const precss = require('precss');
const path = require('path');
const webpack = require('webpack');

const { NODE_ENV, DEBUG } = process.env;
const ENV = NODE_ENV || 'development';
const MODULE_PATH = path.resolve(__dirname, 'node_modules');
const BROWSER_LIST = ['last 2 versions'];

const webpackConfig = {
  devtool: DEBUG ? '#source-map' : undefined,

  context: __dirname,

  entry: {
    app: [
      'react-hot-loader/patch',
      'babel-polyfill',
      './app/main.jsx'
    ]
  },

  output: {
    path: path.resolve('./public/dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        include: path.join(__dirname, 'app'),
        loaders: ['json']
      },
      {
        test: /\.[s]css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&localIdentName=[name]--[local]--[hash:base64:5]!postcss'
        )
      },
    ],
    noParse: [
      /\.min\.js/,
      `${MODULE_PATH}/localforage/dist/localforage.js`
    ]
  },

  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },

  postcss: function plugin(bundler) {
    return [
      postcssImport({ addDependencyTo: bundler }),
      autoprefixer({ browsers: BROWSER_LIST }),
      precss()
    ];
  },

  progress: false,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
        __BROWSER__: JSON.stringify(true),
      }
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    // TODO: find a way to create separate css map file
    new ExtractTextPlugin('app.css', {
      allChunks: true
    })
  ]
};

if (!(DEBUG || ENV === 'development')) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
    })
  );
}

module.exports = webpackConfig;
