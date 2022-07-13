import pkg from 'webpack';
import { join, resolve } from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const { ProgressPlugin, EnvironmentPlugin, DefinePlugin } = pkg;
const dirname = resolve();

const ASSET_PATH = process.env.ASSET_PATH || '/';

const isDev = process.env.NODE_ENV !== 'production';

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

const options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    newtab: join(dirname, 'src', 'pages', 'Newtab', 'index.tsx'),
    options: join(dirname, 'src', 'pages', 'Options', 'index.tsx'),
    popup: join(dirname, 'src', 'pages', 'Popup', 'index.tsx'),
    background: join(dirname, 'src', 'pages', 'Background', 'index.ts'),
    contentScript: join(dirname, 'src', 'pages', 'Content', 'index.tsx'),
    devtools: join(dirname, 'src', 'pages', 'Devtools', 'index.js'),
    panel: join(dirname, 'src', 'pages', 'Panel', 'index.tsx'),
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['background', 'contentScript', 'devtools'],
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(dirname, 'build'),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
              transform: {
                react: { runtime: 'automatic' },
              },
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'swc-loader',
            options: {
              parseMap: isDev,
              jsc: {
                parser: {
                  jsx: true,
                },
                transform: {
                  react: { runtime: 'automatic' },
                },
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: fileExtensions
      .map((extension) => `.${extension}`)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    new ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new EnvironmentPlugin(['NODE_ENV']),
    new DefinePlugin({
      API_URL: isDev ? '"http://localhost:3000"' : '"https://subcloud.app"',
      VERSION: JSON.stringify('v0.1'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: join(dirname, 'build'),
          force: true,
          transform: (content, path) =>
            // generates the manifest file using the package.json informations
            Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            ),
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/pages/Content/content.styles.css',
          to: join(dirname, 'build'),
          force: true,
        },
        {
          from: 'src/pages/Content/runtime',
          to: join(dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/icon-128.png',
          to: join(dirname, 'build'),
          force: true,
        },
        {
          from: 'src/assets/icon-34.png',
          to: join(dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/runtime',
          to: join(dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '_locales',
          to: join(dirname, 'build/_locales'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: join(dirname, 'src', 'pages', 'Newtab', 'index.html'),
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: join(dirname, 'src', 'pages', 'Options', 'index.html'),
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: join(dirname, 'src', 'pages', 'Popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: join(dirname, 'src', 'pages', 'Devtools', 'index.html'),
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: join(dirname, 'src', 'pages', 'Panel', 'index.html'),
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

if (isDev) {
  options.devtool = 'cheap-module-source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

export default options;
