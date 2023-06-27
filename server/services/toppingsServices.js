const knex = require("../db/connection");

function read(toppingInput) {
  return knex("topping_names")
    .select("*")
    .where({ topping_name: toppingInput.topping_name })
    .first();
}

//might need to edit the table its querying
function fetch() {
  return knex("topping_names").select("*");
}

//delete pizza
function destroy(id) {
  return knex("topping_names").where({ id }).del();
}

function update(id, changes) {
  return knex("topping_names").select("*").where({ id }).update(changes);
}

//create new pizza
function post(updatedTopping) {
  return knex("topping_names").select("*").insert(updatedTopping);
}

module.exports = {
  fetch,
  delete: destroy,
  update,
  post,
  read,
};
