require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.REACT_APP_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.REACT_APP_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
