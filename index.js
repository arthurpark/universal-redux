/* eslint no-console: 0, no-var: 0 */

// Register babel to have ES6 support on the server
require('babel-polyfill');
require('babel-register');
global.Promise = require('bluebird');
const hook = require('css-modules-require-hook');

const { NODE_ENV, PORT } = process.env;
const ENV = NODE_ENV || 'development';
const APP_PORT = PORT || 3000;
const DEV_SERVER_PORT = APP_PORT + 1;

// This should be hooked before server's are resolved
hook({
  generateScopedName: ENV === 'development'
                    ? '[name]--[local]'
                    : '[name]--[local]--[hash:base64:5]',
  extensions: ['.css', '.scss']
});

delete process.env.BROWSER;

if (ENV === 'development') {
  const createDevServer = require('./app/create-dev-server').default;
  const devServer = createDevServer(APP_PORT);
  devServer.listen(DEV_SERVER_PORT, 'localhost', (error) => {
    if (error) {
      console.error(error);
    }

    console.info(`WebpackDevServer listening at http://localhost:${DEV_SERVER_PORT}/`);
  });
}

const server = require('./app/server').default;

server.listen(APP_PORT, (error) => {
  if (error) {
    console.error(error);
  }

  console.info(`Listening on ${APP_PORT}`);
});
