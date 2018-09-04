/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  module: {
    noParse: [/moment.js/],
    rules: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: options.babelQuery,
      },
    }, {
      // Transform our own .css files with PostCSS and CSS-modules
      test: /\.css$/,
      exclude: /node_modules/,
      use: options.cssLoaders,
    }, {
      // Transform our own .less files with PostCSS and CSS-modules
      test: /\.less$/,
      exclude: /node_modules/,
      use: options.lessLoaders,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      // loaders: ['style-loader', 'css-loader'],
      use: [
        'style-loader',
        'css-loader',
      ],
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.less$/,
      include: /node_modules/,
      // loaders: ['style-loader', 'css-loader', 'less-loader'],
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      use: 'file-loader',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'file-loader',
      ],
    }, {
      test: /\.html$/,
      use: 'html-loader',
    }, {
      test: /\.json$/,
      use: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    }],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: () => [
          postcssFocus(), // Add a :focus to every :hover
          cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
            browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
          }),
          postcssReporter({ // Posts messages from plugins to the terminal
            clearMessages: true,
          }),
        ],
      },
    }),
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    // alias: { moment: 'moment/moment.js' },
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    /* https://github.com/erikras/redux-form/issues/1637 */
    mainFields: [
      'browser',
      'main',
      'jsnext:main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
});
