const PORT = 4000;

const env = process.env.NODE_ENV || 'development';

const CONFIG = {
  env,
  service_name: process.env.APPLICATION_NAME,
  database: {
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: null,
    password: null
  },
  port: PORT
};

module.exports = CONFIG;
