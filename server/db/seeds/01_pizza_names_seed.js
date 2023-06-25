exports.seed = function (knex) {
  return knex("pizza_names").insert([
    {
      id: 1,
      pizza_name: "Cheese",
    },
    {
      id: 2,
      pizza_name: "Pepperoni",
    },
    {
      id: 3,
      pizza_name: "Meatlovers",
    },
  ]);
};
