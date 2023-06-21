module.exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pizzas_and_toppings')
    .del()
    .then(() => knex('pizza_names').del())
    .then(() => knex('topping_names').del())
};