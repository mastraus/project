exports.seed = function(knex) {
  return knex('topping_names').insert([
    {
      topping_name: 'Pepperoni'
    },
    {
      topping_name: 'Sausage'
    },
    {
      topping_name: 'Canadian Bacon'
    },
    {
      topping_name: 'Black Olive'
    },
    {
      topping_name: 'Wild Donkey'
    },
  ]);
};