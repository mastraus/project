const knex = require('../db/connection');

//might need to edit the table its querying
function getAllPizzas() {
    return knex('pizza_names').select('*');
}

module.exports = {
    getAllPizzas,
}