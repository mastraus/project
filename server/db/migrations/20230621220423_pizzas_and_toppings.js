exports.up = function(knex) {
    return knex.schema.createTable('pizzas_and_toppings',(table) => {
      table.integer('pizza_id').unsigned().references('pizza_names.id');
      table.integer('topping_id').unsigned().references('topping_names.id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pizzas_and_toppings');
  };