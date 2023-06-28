const generatePizzas = (pizzaId, toppingId) => {
  return pizzaId
    .map(({ id: pizzaId }) => {
      return toppingId.map(({ id: toppingId }) => {
        return {
          pizza_id: pizzaId,
          topping_id: toppingId,
        };
      });
    })
    .reduce((a, b) => a.concat(b), []);
};

exports.seed = async function (knex) {
  const pizzaId = await knex("pizza_names").select("id");
  const toppingId = await knex("topping_names").select("id");

  const pizzasWithToppings = generatePizzas(pizzaId, toppingId);
  return knex("pizzas_and_toppings").insert(pizzasWithToppings);
};

// exports.seed = function (knex) {
//   return knex("pizzas_and_toppings").insert([
//     {
//       id: 1,
//       pizza_id: 1,
//       topping_id: null,
//     },
//     {
//       id: 2,
//       pizza_id: 2,
//       topping_id: 1,
//     },
//     {
//       id: 3,
//       pizza_id: 3,
//       topping_id: 1,
//     },
//     {
//       id: 4,
//       pizza_id: 3,
//       topping_id: 2,
//     },
//     {
//       id: 5,
//       pizza_id: 3,
//       topping_id: 3,
//     },
//   ]);
// };
