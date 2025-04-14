import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import PATHS from './paths.js';

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
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  });
};

export default config;
