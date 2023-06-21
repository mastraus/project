//**THIS MIGHT NEED TO BE MOVED TO CONNECTION.JS */

const knex = require('knex');
const knexfile = require('./knexfile');

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);

// const server = knex(knexfile.development);

// module.exports = server;