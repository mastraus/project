const knex = require("../db/connection");

//reject if duplicate

//might need to edit the table its querying
function getAllToppings() {
  return knex("topping_names").select("*");
}

//delete pizza

//create new pizza

//update pizza

//save or update pizza?

module.exports = {
  getAllToppings,
};
