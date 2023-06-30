exports.up = function (knex) {
  return knex.schema.createTable("pizzas_and_toppings", (table) => {
    table.increments("id").primary();
    table.integer("pizza_id").unsigned();
    table
      .foreign("pizza_id")
      .references("id")
      .inTable("pizza_names")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("topping_id").unsigned();
    table
      .foreign("topping_id")
      .references("id")
      .inTable("topping_names")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pizzas_and_toppings");
};
