exports.seed = function(knex) {
  return knex('pizza_names').insert([
    {
      pizza_name: 'Cheese'
    },
    {
      pizza_name: 'Pepperoni'
    },
    {
      pizza_name: 'Meatlovers'
    },
  ]);
};