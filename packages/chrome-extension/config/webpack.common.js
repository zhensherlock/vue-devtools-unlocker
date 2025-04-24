import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import PATHS from './paths.js';

// used in the module rules and in the stats exlude list
const IMAGE_TYPES = /\.(png|jpe?g|gif|svg)$/i;

// To re-use webpack configuration across templates,
// CLI maintains a common webpack configuration file - `webpack.common.js`.
// Whenever user creates an extension, CLI adds `webpack.common.js` file
// in template's `config` folder
const common = {
  output: {
    // the build folder to output bundles and assets in.
    path: PATHS.build,
    // the filename template for entry chunks
    filename: '[name].js',
    clean: true,
  },
  stats: {
    all: false,
    errors: true,
    builtAt: true,
    assets: true,
    excludeAssets: [IMAGE_TYPES],
  },
  module: {
    rules: [
      // Check for TypeScript files
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
      // Help webpack in understanding CSS files imported in .js files
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // Check for images imported in .js files and
      {
        test: IMAGE_TYPES,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': PATHS.src,
    },
    // Help webpack resolve these extensions in order
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // Copy static assets from `public` folder to `build` folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'chrome-manifest.json',
          to: 'manifest.json',
          context: '../../public',
        },
        {
          from: '**/*',
          context: '../../public',
          globOptions: {
            ignore: ['**/firefox-manifest.json', '**/chrome-manifest.json'],
          },
        },
      ],
    }),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};

export default common;
