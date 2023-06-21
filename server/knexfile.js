require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    // pool: { min: 0, max: 5 },
    migrations: {
      directory: './migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    // pool: { min: 0, max: 5 },
    migrations: {
      directory: './migrations',
    },
  },

};
