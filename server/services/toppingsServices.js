const knex = require("../db/connection");

function read(toppingInput) {
  return knex("topping_names")
    .select("*")
    .where({ topping_name: toppingInput.topping_name })
    .first();
}

function fetch() {
  return knex("topping_names").select("*");
}

function destroy(id) {
  return knex("topping_names").where({ id }).del();
}

function update(id, changes) {
  return knex("topping_names").select("*").where({ id }).update(changes);
}

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
