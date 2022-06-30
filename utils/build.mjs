/* eslint-disable import/first */
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

import webpack from 'webpack';
// eslint-disable-next-line import/extensions
import config from '../webpack.config.mjs';

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

webpack(config, (err) => {
  if (err) throw err;
});
