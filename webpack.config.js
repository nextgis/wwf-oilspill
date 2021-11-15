const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

let alias = {};
try {
  const { getAliases } = require('./@nextgis/scripts/aliases');
  alias = getAliases();
} catch (er) {
  // throw new Error();
}

// const cssLoader = {
//   loader: 'css-loader',
//   options: {
//     esModule: false
//   }
// };

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  const plugins = [
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      fix: true,
      files: ['src/'],
      extensions: ['ts'],
    }),

    // new BundleAnalyzerPlugin(),

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
  ];
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name][hash:7].css',
      }),
    );
  }

  return {
    mode: 'development',

    devtool: isProd ? 'source-map' : 'inline-source-map',

    entry: {
      main: ['./src/main.ts'],
      mine: ['./src/mine/main.ts'],
    },

    output: {
      // path: helpers.root('build'),
      filename: '[name][hash:7].js',
      publicPath: isProd ? './' : '',
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias,
    },

    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
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
        // {
        //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //   type: 'asset/resource',
        // },
        // {
        //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
        //   type: 'asset/resource',
        // },
      ],
    },

    target: isProd ? 'browserslist' : 'web',

    plugins,
  };
};
