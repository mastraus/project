// const knex = require('knex');
// const knexfile = require('../knexfile');

// const env = process.env.NODE_ENV || 'development';
// const configOptions = knexfile[env];

// module.exports = knex(configOptions);

const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;