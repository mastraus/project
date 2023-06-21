require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://ajkiegtm:7_hR_cPo5i8lZM0zKMkG5LZkOGadw56S@mahmud.db.elephantsql.com/ajkiegtm',
    // pool: { min: 0, max: 5 },
    migrations: {
      directory: './migrations',
    },
  },

  production: {
    client: 'pg',
    connection: 'postgres://ajkiegtm:7_hR_cPo5i8lZM0zKMkG5LZkOGadw56S@mahmud.db.elephantsql.com/ajkiegtm',
    // pool: { min: 0, max: 5 },
    migrations: {
      directory: './migrations',
    },
  },

};
