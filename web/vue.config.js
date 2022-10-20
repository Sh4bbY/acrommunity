const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  lintOnSave: false,
  parallel: false,
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.join(process.cwd(), 'src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        BUILD_TIME: JSON.stringify(new Date().toISOString()),
        BUILD_VERSION: JSON.stringify(pkg.version),
      }),
      new MomentLocalesPlugin({localesToKeep: ['en', 'de']}),
    ],
    devServer: {
      port: 8080,
      proxy: {
        '^/api/': {
          target: 'http://localhost:9000',
        },
        '^/assets/': {
          target: 'http://localhost:9000',
        },
      },
    },
  },
  pwa: {
    name: 'Acrommunity',
    themeColor: '#1b4e75',
  }
};
