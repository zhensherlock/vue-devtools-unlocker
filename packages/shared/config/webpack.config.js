'use strict';

const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return merge(common, {
    entry: {
      main: PATHS.src + '/main.ts',
    },
    devtool: isProduction ? false : 'source-map',
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      })],
    },
  });
};

module.exports = config;
