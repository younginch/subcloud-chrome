/* eslint-disable import/first */
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';
process.env.PORT = 3001;

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { join, resolve } from 'path';
// eslint-disable-next-line import/extensions
import config from '../webpack.config.mjs';

const { HotModuleReplacementPlugin } = webpack;

const dirname = resolve();
const options = config.chromeExtensionBoilerplate || {};
const excludeEntriesToHotReload = options.notHotReload || [];

// eslint-disable-next-line no-restricted-syntax
for (const entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?hot=true&hostname=localhost&port=${process.env.PORT}`,
    ].concat(config.entry[entryName]);
  }
}

config.plugins = [
  new HotModuleReplacementPlugin(),
  new ReactRefreshWebpackPlugin(),
].concat(config.plugins || []);

delete config.chromeExtensionBoilerplate;

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    https: false,
    hot: false,
    client: {
      logging: 'none',
    },
    host: 'localhost',
    port: process.env.PORT,
    static: {
      directory: join(dirname, '../build'),
    },
    devMiddleware: {
      publicPath: `http://localhost:${process.env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
  },
  compiler
);

(async () => {
  await server.start();
})();
