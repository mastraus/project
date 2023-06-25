exports.seed = function (knex) {
  return knex("pizzas_and_toppings").insert([
    {
      id: 1,
      pizza_id: 1,
      topping_id: null,
    },
    {
      id: 2,
      pizza_id: 2,
      topping_id: 1,
    },
    {
      id: 3,
      pizza_id: 3,
      topping_id: 1,
    },
    {
      id: 4,
      pizza_id: 3,
      topping_id: 2,
    },
    {
      id: 5,
      pizza_id: 3,
      topping_id: 3,
    },
  ]);
};
