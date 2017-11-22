const app = require('./app');
const debug = require('debug')('server:server');
const http = require('http');
const CONFIG = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePort(CONFIG.port);
app.set('port', port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

mongoose.connect(`mongodb://${CONFIG.database.host}/${CONFIG.database.name}`, { useMongoClient: true })
.then(() => {
  /* eslint-disable no-console */
  console.log('DB Connection has been established successfully.');
  const server = http.createServer(app);
  server.on('error', onError);
  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `Pipe ${port}` : `Port ${port}`;
    debug(`Listening on ${bind}`);
  });
  return server.listen(port, () => {
    console.log(`${CONFIG.service_name} listening on port ${port}`);
  });
})
.catch((err) => {
  console.error('Unable to connect to the database:', err);
  process.exit(3);
});
/* eslint-enable no-console */
