const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const helpers = require('./helpers');

let alias = {};
try {
  const { getAliases } = require('./@nextgis/scripts/aliases');
  alias = getAliases();
} catch (er) {
  throw new Error();
}

const sassLoaderOptions = {
  implementation: require('sass'),
  sassOptions: {
    fiber: require('fibers'),
    indentedSyntax: false, // optional
  },
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    esModule: false,
  },
};

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: 'development',

    devtool: isProd ? 'none' : 'eval-source-map',

    entry: {
      main: ['./src/main.ts'],
      mine: ['./src/mine/main.ts'],
    },

    output: {
      path: helpers.root('build'),
      filename: '[name][hash:7].js',
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            cssLoader,
          ],
        },
        // {
        //   test: /\.s(c|a)ss$/,
        //   use: [
        //     isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        //     cssLoader,
        //     {
        //       loader: 'sass-loader',
        //       options: sassLoaderOptions,
        //     },
        //   ],
        // },

        {
          test: /\.s(c|a)ss$/,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              // options: {
              //   publicPath: './',
              // },
            },
            cssLoader,
            // 'postcss-loader',
            {
              loader: 'sass-loader',
              options: sassLoaderOptions,
            },
          ],
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name]-[hash:7].[ext]',
          ],
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name]-[hash:7].[ext]',
          ],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: ['file-loader?name=fonts/[name]-[hash:7].[ext]'],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader?bypassOnDebug',
          ],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name][hash:7].css',
        allChunks: true,
      }),
      new ESLintPlugin({
        fix: true,
        files: ['src/'],
        extensions: ['ts'],
      }),

      // new HtmlWebpackPlugin({ template: 'src/index.html' })
      new HtmlWebpackPlugin({
        chunks: ['main'],
        template: 'src/index.html',
      }),
      new HtmlWebpackPlugin({
        chunks: ['mine'],
        template: 'src/mine/index.html',
        filename: 'mine.html',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
        __BROWSER__: true,
        __DEV__: !isProd,
      }),
    ],
  };
};
