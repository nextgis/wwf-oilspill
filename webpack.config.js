var helpers = require('./helpers');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let alias = {};
try {
  const { getAliases } = require('./nextgisweb_frontend/build/aliases');
  alias = getAliases();
} catch (er) {
  // ignore
}

module.exports = (env, argv) => {
  return {
    mode: 'development',

    devtool: argv.mode === 'production' ? 'none' : 'source-map', // #eval-source-map',

    entry: {
      // "vendor": ["babel-polyfill", "./common/polyfill.js", "./common/vendor.js",],
      main: ['./src/main.ts']
    },

    output: {
      path: helpers.root('build'),
      filename: '[name][hash:7].js'
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias
    },

    module: {
      rules: [
        // {
        //   enforce: 'pre',
        //   test: /\.(t|j)sx?$/,
        //   loader: 'eslint-loader',
        //   exclude: /node_modules/,
        //   options: {
        //     fix: true
        //   }
        // },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './'
              }
            },
            'css-loader',
            // 'postcss-loader',
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: ['url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name]-[hash:7].[ext]']
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: ['url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name]-[hash:7].[ext]']
        },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader?name=fonts/[name]-[hash:7].[ext]'] },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ['file-loader?name=images/[name].[ext]', 'image-webpack-loader?bypassOnDebug']
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({ filename: '[name][hash:7].css', allChunks: true }),
      new HtmlWebpackPlugin({ template: 'src/index.html' })
    ]
  };
};
