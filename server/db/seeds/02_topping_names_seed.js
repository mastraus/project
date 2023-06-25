exports.seed = function (knex) {
  return knex("topping_names").insert([
    {
      id: 1,
      topping_name: "Pepperoni",
    },
    {
      id: 2,
      topping_name: "Sausage",
    },
    {
      id: 3,
      topping_name: "Canadian Bacon",
    },
    {
      id: 4,
      topping_name: "Black Olive",
    },
    {
      id: 5,
      topping_name: "Wild Donkey",
    },
  ]);
};
