exports.up = function(knex) {
    return knex.schema.createTable('topping_names',(table) => {
        table.increments('id').primary();
        table.string('topping_name');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('topping_names');
  };